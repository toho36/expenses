import {
  numeric,
  text,
  pgTable,
  serial,
  index,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index('user_idx').on(expenses.userId),
    };
  }
);

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  amount: z
    .string()
    .regex(/^\d+(.\d{1,2})?$/, { message: 'Amount must be a monetary value' }),
  date: z.string().datetime(),
});

// Schema for selecting an Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
