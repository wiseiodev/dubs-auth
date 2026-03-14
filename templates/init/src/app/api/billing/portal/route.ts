import { createBillingRouteHandlers } from '@wiseiodev/dubs-auth';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey || !stripeWebhookSecret) {
  throw new Error('Stripe environment variables are not configured.');
}

const handlers = createBillingRouteHandlers({
  stripeSecretKey,
  stripeWebhookSecret,
  getCustomerId: async () => {
    /**
     * TODO:
     * Resolve the Stripe customer id for the current signed-in actor.
     * You can read Better Auth session and map user/org to stripe customer id.
     */
    return null;
  },
});

export const GET = handlers.portal.GET;
