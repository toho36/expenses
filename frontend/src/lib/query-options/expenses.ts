import { queryOptions } from '@tanstack/react-query';
import { getAllExpenses, type CreateExpense } from '@/lib/api/expenses';

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ['loading-create-expense'],
  queryFn: async () => ({}),
  staleTime: Infinity,
});
