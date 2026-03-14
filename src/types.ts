import type { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type Stripe from 'stripe';

export type DubsRole = 'owner' | 'admin' | 'member';

export interface DubsPlanPriceConfig {
  monthly: string;
  annual?: string;
  seatPriceId?: string;
}

export interface DubsPlanConfig {
  key: string;
  displayName: string;
  description?: string;
  limits?: Record<string, number>;
  prices: DubsPlanPriceConfig;
  trialDays?: number;
  metadata?: Record<string, string>;
}

export interface DubsEmailPasswordConfig {
  enabled?: boolean;
}

export interface DubsGoogleProviderConfig {
  clientId: string;
  clientSecret: string;
}

export interface DubsAuthProvidersConfig {
  emailPassword?: DubsEmailPasswordConfig;
  google?: DubsGoogleProviderConfig;
}

export interface DubsOrganizationConfig {
  teamsEnabled?: boolean;
  allowUserToCreateOrganization?: boolean;
  billingRoles?: DubsRole[];
}

export interface DubsStripeConfig {
  enabled?: boolean;
  secretKey: string;
  webhookSecret: string;
  plans: DubsPlanConfig[];
  createCustomerOnSignUp?: boolean;
  subscriptionEnabled?: boolean;
  requireOrganization?: boolean;
}

export interface DubsAuthCallbacks {
  sendVerificationEmail?: (args: {
    userId: string;
    email: string;
    verificationUrl: string;
  }) => Promise<void> | void;
  sendResetPassword?: (args: {
    userId: string;
    email: string;
    resetUrl: string;
  }) => Promise<void> | void;
  onStripeWebhookEvent?: (event: Stripe.Event) => Promise<void> | void;
}

export interface DubsAuthConfig {
  secret: string;
  baseUrl: string;
  database: Parameters<typeof drizzleAdapter>[0];
  databaseSchema?: Parameters<typeof drizzleAdapter>[1]['schema'];
  providers?: DubsAuthProvidersConfig;
  organization?: DubsOrganizationConfig;
  stripe?: DubsStripeConfig;
  callbacks?: DubsAuthCallbacks;
}

export interface DubsAuthClientConfig {
  baseUrl: string;
  subscriptionEnabled?: boolean;
  teamsEnabled?: boolean;
}

export interface DubsBillingRouteConfig {
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  getCustomerId: (request: Request) => Promise<string | null>;
  getReturnUrl?: (request: Request) => string;
  onWebhookEvent?: (event: Stripe.Event) => Promise<void> | void;
}

export interface DubsBillingPortalResponse {
  url: string;
}
