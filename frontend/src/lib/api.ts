import { hc } from 'hono/client';
import { ApiRoutes } from '@server/app';
const client = hc<ApiRoutes>('/');

console.log('API Routes:', ApiRoutes);
export const api = client.api;
