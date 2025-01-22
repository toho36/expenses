import { createFileRoute } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@/lib/api';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  if (isPending) return 'loading';
  if (error) return 'An error has occured: ' + error.message;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>user profile</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? '...' : data.user.family_name}</CardContent>
      <a href="/api/logout"> Logout!</a>
    </Card>
  );
}
