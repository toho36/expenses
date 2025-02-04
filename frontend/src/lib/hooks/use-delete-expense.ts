import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '@/lib/api/expenses';
import { getAllExpensesQueryOptions } from '@/lib/query-options/expenses';
import { toast } from 'sonner';

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteExpense({ id }), // Update to match your API signature
    onMutate: async (id) => {
      await queryClient.cancelQueries(getAllExpensesQueryOptions);
      const previousExpenses = queryClient.getQueryData(
        getAllExpensesQueryOptions.queryKey
      );

      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, (old) => ({
        ...old,
        expenses: old?.expenses?.filter((exp) => exp.id !== id) || [],
      }));

      return { previousExpenses };
    },
    onSuccess: (_, id) => {
      toast('Expense Deleted', {
        description: `Successfully deleted expense: ${id}`,
      });
    },
    onError: (err, id, context) => {
      console.error('delete expense error:', err);
      toast('Error', {
        description: `Failed to delete expense: ${id}`,
      });
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        context?.previousExpenses
      );
    },
  });
}
