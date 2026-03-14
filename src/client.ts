import { stripeClient } from '@better-auth/stripe/client';
import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import type { DubsAuthClientConfig } from './types';

export const createDubsAuthClient = (config: DubsAuthClientConfig) =>
  createAuthClient({
    baseURL: config.baseUrl,
    plugins: [
      organizationClient({
        teams: {
          enabled: config.teamsEnabled ?? true,
        },
      }),
      ...(config.subscriptionEnabled === false
        ? []
        : [stripeClient({ subscription: true })]),
    ],
  });
