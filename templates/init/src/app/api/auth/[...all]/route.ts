import { createAuthRouteHandlers } from '@wiseiodev/dubs-auth';

import { auth } from '@/lib/dubs-auth';

export const { GET, POST } = createAuthRouteHandlers(auth);
