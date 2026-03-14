import { createDubsAuth, type DubsPlanConfig } from '@wiseiodev/dubs-auth';

import { dubsAuthSchema } from '@/db/dubs-auth-schema';
import { db } from '@/lib/db';

const betterAuthSecret =
  process.env.BETTER_AUTH_SECRET ?? 'dev-secret-change-before-production';
const defaultPort = process.env.PORT ?? '3000';
const defaultBaseUrl = `http://localhost:${defaultPort}`;
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? (process.env.BETTER_AUTH_URL ?? defaultBaseUrl)
    : defaultBaseUrl;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const starterMonthlyPriceId = process.env.STRIPE_STARTER_MONTHLY_PRICE_ID;
const starterAnnualPriceId = process.env.STRIPE_STARTER_ANNUAL_PRICE_ID;

const plans: DubsPlanConfig[] = [
  {
    key: 'starter',
    displayName: 'Starter',
    prices: {
      monthly: starterMonthlyPriceId ?? 'price_starter_monthly_placeholder',
      annual: starterAnnualPriceId,
    },
  },
];

const stripeEnabled = Boolean(stripeSecretKey && stripeWebhookSecret);

export const auth = createDubsAuth({
  baseUrl,
  secret: betterAuthSecret,
  database: db,
  databaseSchema: dubsAuthSchema,
  providers: {
    emailPassword: { enabled: true },
  },
  stripe: stripeEnabled
    ? {
        secretKey: stripeSecretKey as string,
        webhookSecret: stripeWebhookSecret as string,
        plans,
        createCustomerOnSignUp: true,
      }
    : undefined,
});

export { plans, stripeEnabled };
