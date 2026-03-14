import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/dubs-auth-schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./.data/dubs-auth',
  },
});
