import { queryOptions } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/user';

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
