import app from './app';

Bun.serve({
  port: process.env.PORT || 3000,
  hostname: '66.241.124.55',
  fetch: app.fetch,
});

console.log('server running');
