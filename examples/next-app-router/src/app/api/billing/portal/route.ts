import { createBillingRouteHandlers } from '@wiseiodev/dubs-auth';
import { eq } from 'drizzle-orm';

import { dubsAuthSchema } from '@/db/dubs-auth-schema';
import { db } from '@/lib/db';
import { auth } from '@/lib/dubs-auth';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeNotConfiguredResponse = () =>
  Response.json(
    {
      error:
        'Stripe is not configured for this app. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.',
    },
    { status: 503 },
  );

const getCustomerId = async (request: Request): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const matches = await db
    .select({ stripeCustomerId: dubsAuthSchema.user.stripeCustomerId })
    .from(dubsAuthSchema.user)
    .where(eq(dubsAuthSchema.user.id, userId))
    .limit(1);

  return matches[0]?.stripeCustomerId ?? null;
};

export const GET = async (request: Request): Promise<Response> => {
  if (!stripeSecretKey || !stripeWebhookSecret) {
    return stripeNotConfiguredResponse();
  }

  const handlers = createBillingRouteHandlers({
    stripeSecretKey,
    stripeWebhookSecret,
    getCustomerId,
    getReturnUrl: (currentRequest) =>
      new URL('/billing', currentRequest.url).toString(),
  });

  return handlers.portal.GET(request);
};
