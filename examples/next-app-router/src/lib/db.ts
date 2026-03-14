import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

import * as schema from '@/db/dubs-auth-schema';

const connection = process.env.DATABASE_URL ?? 'file:./.data/dubs-auth';
const dataDir = connection.startsWith('file:')
  ? connection.slice(5)
  : connection;

const client = new PGlite(dataDir);

export const db = drizzle(client, { schema });
