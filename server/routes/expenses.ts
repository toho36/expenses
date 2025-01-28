import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getUser } from '../kinde';
import { db } from '../db';
import { expenses as expenseTable } from '../db/schema/expenses';
import { eq, desc, sum, and } from 'drizzle-orm';

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

export const expensesRoute = new Hono()
  .get('/', getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .orderBy(desc(expenseTable.createdAt))
      .limit(100);

    return c.json({ expenses: expenses });
  })
  .post('/', getUser, zValidator('json', createPostSchema), async (c) => {
    const expense = await c.req.valid('json');
    const user = c.var.user;

    const result = await db
      .insert(expenseTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    c.status(201);
    return c.json(result);
  })
  .get('/total-spent', getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ total: sum(expenseTable.amount) })
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(result);
  })
  .get('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user;

    const expense = await db
      .select()
      .from(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  })
  .delete('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user;

    const expense = await db
      .delete(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense: expense });
  });
