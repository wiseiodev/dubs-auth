# Imports and API Surface

Use `@wiseiodev/dubs-auth` as a composable toolkit. Import only what you need.

## Core auth

```ts
import {
  createAuthRouteHandlers,
  createDubsAuth,
  dubsAuthSchema,
} from '@wiseiodev/dubs-auth';
```

- `createDubsAuth`: compose Better Auth + org + Stripe behavior.
- `createAuthRouteHandlers`: creates `{ GET, POST }` auth handlers for Next.js.
- `dubsAuthSchema`: schema bundle for Drizzle adapter wiring.

## Client-side auth and billing

```ts
import {
  createDubsAuthClient,
  DubsManageBillingButton,
  DubsSignInForm,
  DubsSignUpForm,
  useBillingPortal,
} from '@wiseiodev/dubs-auth';
```

- `createDubsAuthClient`: Better Auth client factory.
- `useBillingPortal`: helper to create and open billing portal sessions.
- `DubsSignInForm`, `DubsSignUpForm`, `DubsManageBillingButton`: ready-to-use UI
  components.

## Plans and subscription helpers

```ts
import {
  BILLING_ROLES,
  deriveSubscriptionPatchFromEvent,
  getPlanByKey,
  getPlanLimits,
  hasBillingAccess,
  resolvePlanByPriceId,
  toBetterAuthStripePlans,
  toDubsSubscriptionEvent,
  upsertSubscriptionRecord,
} from '@wiseiodev/dubs-auth';
```

Use these for Stripe webhook normalization, authorization checks, and plan lookup.

## Environment validation

```ts
import { DubsEnvSchema, validateDubsEnv } from '@wiseiodev/dubs-auth';
```

- `validateDubsEnv(process.env)` gives typed validated env.
- `DubsEnvSchema` can be reused for custom validation paths.

## Types

```ts
import type {
  DubsAuthConfig,
  DubsBillingRouteConfig,
  DubsPlanConfig,
  DubsStripeConfig,
} from '@wiseiodev/dubs-auth';
```

Key types are exported from the package root for app-level type safety.
