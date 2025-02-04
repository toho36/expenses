import { useQuery } from "@tanstack/react-query";
import { fetchTotalSpent } from '@/lib/api/expenses';


export function useTotalSpent() {
  return useQuery({
    queryKey: ["get-total-spent"],
    queryFn: fetchTotalSpent,
  });
}
