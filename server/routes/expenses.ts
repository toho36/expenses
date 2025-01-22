import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

import { getUser } from '../kinde';
const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: 'Coffee', amount: 3.5 },
  { id: 2, title: 'Lunch', amount: 12.0 },
  { id: 3, title: 'Groceries', amount: 45.0 },
];

export const expensesRoute = new Hono()
  .get('/', getUser, async (c) => {
    const user = c.var.user;
    return c.json({ expenses: fakeExpenses });
  })
  .post('/', getUser, zValidator('json', createPostSchema), async (c) => {
    const expense = await c.req.valid('json');
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })
  .get('/total-spent', getUser, async (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total });
  })
  .get('/:id{[0-9]+}', getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
