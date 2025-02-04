import { hc } from 'hono/client';
import type { ApiRoutes } from '@server/app';

const client = hc<ApiRoutes>('/');
const api = client.api;

export async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) throw new Error('Failed to fetch current user');
  return res.json();
}
