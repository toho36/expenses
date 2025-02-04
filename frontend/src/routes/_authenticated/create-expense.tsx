import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useCreateExpense } from '@/lib/hooks/use-create-expense';
import { Calendar } from '@/components/ui/calendar';
import { createExpenseSchema } from '@server/sharedTypes';

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});

function CreateExpense() {
  const { mutate } = useCreateExpense();

  const form = useForm({
    defaultValues: {
      title: '',
      amount: '0',
      date: new Date().toISOString(),
    },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-y-4 max-w-xl m-auto"
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(', ')}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </div>
            );
          }}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(', ')}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </div>
            );
          }}
        />
        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => (
            <div className="self-center">
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) =>
                  field.handleChange((date ?? new Date()).toISOString())
                }
                className="rounded-md border"
              />
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={(
            [canSubmit, isSubmitting] // Use the actual form states
          ) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
