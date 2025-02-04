import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useDeleteExpense } from '@/lib/hooks/use-delete-expense';

export function ExpenseDeleteButton({ id }: { id: number }) {
  const { mutate, isPending } = useDeleteExpense();

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate(id)} // Convert to string if needed, or adjust hook
      variant="ghost"
      size="icon"
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
