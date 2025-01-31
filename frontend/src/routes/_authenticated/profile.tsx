import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-500">
        An error has occurred: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        {/* Avatar Section */}
        <Avatar className="w-24 h-24 mx-auto shadow-md">
          {data.user.picture && (
            <AvatarImage
              src={data.user.picture}
              alt={data.user.given_name}
              className="rounded-full"
            />
          )}
          <AvatarFallback className="text-xl font-semibold">
            {data.user.given_name[0]}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <h2 className="text-2xl font-bold mt-4">
          {data.user.given_name} {data.user.family_name}
        </h2>
        <p className="text-gray-500">{data.user.email}</p>

        {/* Logout Button */}
        <Button asChild className="mt-6 w-full">
          <a href="/api/logout">Logout</a>
        </Button>
      </div>
    </div>
  );
}
