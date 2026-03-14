import { createBillingRouteHandlers } from '@wiseiodev/dubs-auth';

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

export const POST = async (request: Request): Promise<Response> => {
  if (!stripeSecretKey || !stripeWebhookSecret) {
    return stripeNotConfiguredResponse();
  }

  const handlers = createBillingRouteHandlers({
    stripeSecretKey,
    stripeWebhookSecret,
    getCustomerId: async () => null,
    onWebhookEvent: async (event) => {
      console.log('[dubs-auth example] stripe webhook event', event.type);
    },
  });

  return handlers.webhook.POST(request);
};
