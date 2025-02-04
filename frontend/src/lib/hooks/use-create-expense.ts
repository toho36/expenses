import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense } from '@/lib/api/expenses';
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '@/lib/query-options/expenses';
import { toast } from 'sonner';
import { type CreateExpense } from '@server/sharedTypes';

import { useNavigate } from '@tanstack/react-router';

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: CreateExpense) => createExpense({ value: values }),
    onMutate: async (values) => {
      await queryClient.cancelQueries(getAllExpensesQueryOptions);
      const previousExpenses = queryClient.getQueryData(
        getAllExpensesQueryOptions.queryKey
      );

      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: values,
      });

      return { previousExpenses };
    },
    onSuccess: (newExpense) => {
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, (old) => ({
        ...old,
        expenses: [newExpense, ...(old?.expenses || [])],
      }));
      toast('Expense Created', {
        description: `Successfully created new expense: ${newExpense.id}`,
      });
      navigate({ to: '/expenses' });
    },
    onError: (err, values, context) => {
      console.error('Create expense error:', err, values);
      toast('Error', { description: 'Failed to create new expense' });
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        context?.previousExpenses
      );
    },
    onSettled: () => {
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
    },
  });
}
