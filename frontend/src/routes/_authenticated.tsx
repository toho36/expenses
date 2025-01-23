import { Outlet } from '@tanstack/react-router';

import { createFileRoute } from '@tanstack/react-router';
import { userQueryOptions } from '@/lib/api';
// src/routes/_authenticated.tsx

const Login = () => {
  return (
    <div>
      You have to login
      <div>
        <a href="/api/login"> Login!</a>
      </div>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch {
      return {
        user: null,
      };
    }
  },
  component: Component,
});
