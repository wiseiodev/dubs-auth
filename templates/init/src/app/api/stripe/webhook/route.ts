import { createBillingRouteHandlers } from '@wiseiodev/dubs-auth';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey || !stripeWebhookSecret) {
  throw new Error('Stripe environment variables are not configured.');
}

const handlers = createBillingRouteHandlers({
  stripeSecretKey,
  stripeWebhookSecret,
  getCustomerId: async () => null,
  onWebhookEvent: async (event) => {
    /**
     * TODO:
     * Persist webhook events to your local subscription table.
     * Use `toDubsSubscriptionEvent`, `deriveSubscriptionPatchFromEvent`,
     * and `upsertSubscriptionRecord` from the package.
     */
    console.log('[dubs-auth] stripe webhook', event.type);
  },
});

export const POST = handlers.webhook.POST;
