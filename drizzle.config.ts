import type { Config } from 'drizzle-kit';

export default {
  schema: './server/db/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Correct property for PostgreSQL
  },
} satisfies Config;
