import { stripe as stripePlugin } from '@better-auth/stripe';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { organization } from 'better-auth/plugins';
import Stripe from 'stripe';
import { toBetterAuthStripePlans } from './plans';
import { BILLING_ROLES } from './subscription';
import type { DubsAuthConfig } from './types';

const hasAllowedBillingRole = (
  requestedRole: string | null | undefined,
  allowedRoles: readonly string[],
): boolean => {
  if (!requestedRole) {
    return false;
  }
  return allowedRoles.includes(requestedRole);
};

export const createDubsAuth = (config: DubsAuthConfig) => {
  const plugins: NonNullable<Parameters<typeof betterAuth>[0]['plugins']> = [
    nextCookies(),
    organization({
      teams: {
        enabled: config.organization?.teamsEnabled ?? true,
      },
      allowUserToCreateOrganization:
        config.organization?.allowUserToCreateOrganization ?? true,
    }),
  ];

  if (config.stripe?.enabled !== false && config.stripe) {
    const stripeClient = new Stripe(config.stripe.secretKey);
    const allowedBillingRoles =
      config.organization?.billingRoles ?? BILLING_ROLES;

    plugins.push(
      stripePlugin({
        stripeClient,
        stripeWebhookSecret: config.stripe.webhookSecret,
        createCustomerOnSignUp: config.stripe.createCustomerOnSignUp ?? false,
        subscription: {
          enabled: config.stripe.subscriptionEnabled ?? true,
          plans: toBetterAuthStripePlans(config.stripe.plans),
          requireOrganization: config.stripe.requireOrganization ?? true,
        },
        organization: {
          enabled: true,
          authorizeReference: ({
            session,
          }: {
            session: {
              activeMember?: {
                role?: string | null;
              };
            };
          }) => {
            const role = session.activeMember?.role;
            return hasAllowedBillingRole(role, allowedBillingRoles);
          },
        },
      }),
    );
  }

  return betterAuth({
    secret: config.secret,
    baseURL: config.baseUrl,
    database: drizzleAdapter(config.database, {
      provider: 'pg',
      schema: config.databaseSchema,
    }),
    emailAndPassword: {
      enabled: config.providers?.emailPassword?.enabled ?? true,
      ...(config.callbacks?.sendResetPassword
        ? {
            sendResetPassword: async ({ user, url }) => {
              await config.callbacks?.sendResetPassword?.({
                userId: user.id,
                email: user.email,
                resetUrl: url,
              });
            },
          }
        : {}),
    },
    ...(config.callbacks?.sendVerificationEmail
      ? {
          emailVerification: {
            sendOnSignUp: true,
            sendVerificationEmail: async ({ user, url }) => {
              await config.callbacks?.sendVerificationEmail?.({
                userId: user.id,
                email: user.email,
                verificationUrl: url,
              });
            },
          },
        }
      : {}),
    ...(config.providers?.google
      ? {
          socialProviders: {
            google: {
              clientId: config.providers.google.clientId,
              clientSecret: config.providers.google.clientSecret,
            },
          },
        }
      : {}),
    plugins,
  });
};

export type DubsAuthInstance = ReturnType<typeof createDubsAuth>;
