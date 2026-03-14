import { createDubsAuthClient } from '@wiseiodev/dubs-auth';

const defaultPort = process.env.PORT ?? '3000';
const defaultBaseUrl = `http://localhost:${defaultPort}`;
const browserBaseUrl =
  typeof window === 'undefined' ? null : window.location.origin;

export const authClient = createDubsAuthClient({
  // In browser, always use same-origin so changing dev ports doesn't break auth.
  baseUrl:
    browserBaseUrl ?? process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? defaultBaseUrl,
});
