import {
  createDubsAuth,
  dubsAuthSchema,
  validateDubsEnv,
} from '@wiseiodev/dubs-auth';

import { db } from '@/db';

const env = validateDubsEnv(process.env);

export const auth = createDubsAuth({
  baseUrl: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: db,
  databaseSchema: dubsAuthSchema,
  providers: {
    emailPassword: { enabled: true },
  },
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    plans: [
      {
        key: 'starter',
        displayName: 'Starter',
        prices: {
          monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID ?? '',
          annual: process.env.STRIPE_STARTER_ANNUAL_PRICE_ID ?? '',
        },
      },
      {
        key: 'pro',
        displayName: 'Pro',
        prices: {
          monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? '',
          annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID ?? '',
        },
      },
    ],
  },
});
