# Runtime API Guide

This package exports composable server, client, UI, env, and billing helpers.

## Core Server Composition

```ts
import {
  createDubsAuth,
  createAuthRouteHandlers,
  dubsAuthSchema,
} from '@wiseiodev/dubs-auth';
```

`createDubsAuth` composes Better Auth with:

- Drizzle adapter (PostgreSQL provider)
- Organization plugin (teams enabled by default)
- Stripe plugin (when `stripe` config is provided and enabled)
- Email/password provider enabled by default
- Optional Google social provider

Best-practice setup:

- Validate env before constructing config.
- Pass a real DB handle plus `dubsAuthSchema` (or compatible schema object).
- Use explicit Stripe plans with stable keys.
- Wire verification and reset callbacks when transactional email is required.

## Next.js Route Helpers

```ts
import {
  createAuthRouteHandlers,
  createBillingRouteHandlers,
} from '@wiseiodev/dubs-auth';
```

- `createAuthRouteHandlers(auth)` returns `{ GET, POST }` for auth route.
- `createBillingRouteHandlers(config)` returns:
  - `portal.GET`
  - `webhook.POST`

## Client And UI Exports

Auth client:

```ts
import { createDubsAuthClient } from '@wiseiodev/dubs-auth';
```

UI and hooks:

```ts
import {
  DubsSignInForm,
  DubsSignUpForm,
  DubsManageBillingButton,
  useBillingPortal,
} from '@wiseiodev/dubs-auth';
```

Best-practice UI usage:

- Keep form submit handlers app-owned.
- Surface backend errors clearly in UI.
- Use `useBillingPortal` behind authenticated routes.
- Set explicit `endpoint` when API route path differs from default
  (`/api/billing/portal`).

## Plans And Authorization Helpers

```ts
import {
  BILLING_ROLES,
  getPlanByKey,
  getPlanLimits,
  resolvePlanByPriceId,
  toBetterAuthStripePlans,
  hasBillingAccess,
} from '@wiseiodev/dubs-auth';
```

Use these helpers for:

- Plan lookup by app-level plan key.
- Stripe price ID to plan resolution.
- Role-gated billing actions (`owner`/`admin` defaults).

## Subscription Sync Helpers

```ts
import {
  toDubsSubscriptionEvent,
  deriveSubscriptionPatchFromEvent,
  upsertSubscriptionRecord,
} from '@wiseiodev/dubs-auth';
```

Use this trio in webhook processing for normalized, idempotent updates.
