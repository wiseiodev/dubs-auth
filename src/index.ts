export type { DubsAuthInstance } from './auth';
export { createDubsAuth } from './auth';
export { createDubsAuthClient } from './client';
export {
  DubsManageBillingButton,
  type DubsManageBillingButtonProps,
} from './components/manage-billing-button';
export {
  DubsSignInForm,
  type DubsSignInFormProps,
  type SignInFormValues,
} from './components/sign-in-form';
export {
  DubsSignUpForm,
  type DubsSignUpFormProps,
  type SignUpFormValues,
} from './components/sign-up-form';
export { DubsEnvSchema, validateDubsEnv } from './env';
export {
  type UseBillingPortalResult,
  useBillingPortal,
} from './hooks/use-billing-portal';
export { createAuthRouteHandlers, createBillingRouteHandlers } from './next';
export {
  getPlanByKey,
  getPlanLimits,
  resolvePlanByPriceId,
  toBetterAuthStripePlans,
} from './plans';
export { dubsAuthSchema } from './schema';
export {
  BILLING_ROLES,
  deriveSubscriptionPatchFromEvent,
  hasBillingAccess,
  toDubsSubscriptionEvent,
  upsertSubscriptionRecord,
} from './subscription';
export type {
  DubsAuthCallbacks,
  DubsAuthClientConfig,
  DubsAuthConfig,
  DubsBillingPortalResponse,
  DubsBillingRouteConfig,
  DubsPlanConfig,
  DubsPlanPriceConfig,
  DubsRole,
  DubsStripeConfig,
} from './types';
