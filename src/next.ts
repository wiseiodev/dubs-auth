import { toNextJsHandler } from 'better-auth/next-js';
import Stripe from 'stripe';

import type { DubsAuthInstance } from './auth';
import type { DubsBillingRouteConfig } from './types';

export const createAuthRouteHandlers = (auth: DubsAuthInstance) =>
  toNextJsHandler(auth);

export const createBillingRouteHandlers = (config: DubsBillingRouteConfig) => {
  const stripeClient = new Stripe(config.stripeSecretKey);

  return {
    portal: {
      GET: async (request: Request): Promise<Response> => {
        const customerId = await config.getCustomerId(request);
        if (!customerId) {
          return Response.json(
            { error: 'No Stripe customer is linked to this identity.' },
            { status: 403 },
          );
        }

        const returnUrl =
          config.getReturnUrl?.(request) ??
          new URL('/', request.url).toString();

        const session = await stripeClient.billingPortal.sessions.create({
          customer: customerId,
          return_url: returnUrl,
        });

        return Response.json({ url: session.url });
      },
    },
    webhook: {
      POST: async (request: Request): Promise<Response> => {
        const signature = request.headers.get('stripe-signature');
        if (!signature) {
          return Response.json(
            { error: 'Missing Stripe signature header.' },
            { status: 400 },
          );
        }

        const payload = await request.text();

        let event: Stripe.Event;
        try {
          event = stripeClient.webhooks.constructEvent(
            payload,
            signature,
            config.stripeWebhookSecret,
          );
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Invalid webhook payload.';
          return Response.json({ error: message }, { status: 400 });
        }

        await config.onWebhookEvent?.(event);
        return Response.json({ received: true });
      },
    },
  };
};
