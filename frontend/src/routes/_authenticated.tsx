import { Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { userQueryOptions } from '@/lib/query-options';
import { Button } from '@/components/ui/button';

// Login Component
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome!</h2>
        <p className="text-gray-600 mt-2">
          You need to login or register to access your account.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Button asChild className="w-full">
            <a href="/api/login">Login</a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href="/api/register">Register</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Authenticated Component
const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

// Route Definition
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch {
      return { user: null };
    }
  },
  component: Component,
});
