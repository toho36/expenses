import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api'; // Ensure this import is correct

export const Route = createFileRoute('/expenses')({
  component: Expenses,
});

async function getAllExpenses() {
  const res = await api.expenses.$get(); // Adjust the endpoint as necessary
  if (!res.ok) {
    throw new Error('server error');
  }
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="p-2">
      <h1>Show All Expenses</h1>
      {isPending ? (
        'Loading...'
      ) : (
        <ul>
          {data.expenses.map(
            (
              expense // Accessing the expenses array
            ) => (
              <li key={expense.id}>
                {expense.title}: ${expense.amount}
              </li> // Changed description to title
            )
          )}
        </ul>
      )}
    </div>
  );
}
