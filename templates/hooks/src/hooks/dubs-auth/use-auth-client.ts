import { createDubsAuthClient } from '@wiseiodev/dubs-auth';

export const authClient = createDubsAuthClient({
  baseUrl: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? 'http://localhost:3000',
});
