import { createFileRoute } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useTotalSpent } from '@/lib/hooks/use-total-spent';
export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useTotalSpent();
  if (error) return 'An error has occured: ' + error.message;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>Total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? '...' : data.total}</CardContent>
    </Card>
  );
}
