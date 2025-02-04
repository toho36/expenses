import { hc } from 'hono/client';
import type { ApiRoutes } from '@server/app';
import type { CreateExpense } from '@server/sharedTypes';

const client = hc<ApiRoutes>('/');
const api = client.api;

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}

export async function createExpense({ value }: { value: CreateExpense }) {
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) throw new Error('Failed to create expense');
  return res.json();
}

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[':id{[0-9]+}'].$delete({
    param: { id: id.toString() },
  });
  if (!res.ok) throw new Error('Failed to delete expense');
}

export type { CreateExpense };

export async function fetchTotalSpent() {
  const res = await api.expenses['total-spent'].$get();
  if (!res.ok) throw new Error('Failed to fetch total spent');
  return res.json();
}
