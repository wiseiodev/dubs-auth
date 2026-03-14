# Integration Recipes

## 1) Bootstrap a new Next.js App Router integration

```bash
pnpm exec dubs-auth init
pnpm exec dubs-auth generate schema
```

Then wire env vars from `.env.dubs-auth.example` and connect your app DB object
in `src/lib/dubs-auth.ts`.

## 2) Add editable UI and hooks to your app

```bash
pnpm exec dubs-auth add ui
pnpm exec dubs-auth add hooks
```

This lets teams customize components and hooks directly in app source.

## 3) Wire auth route handlers

In your auth route:

```ts
import { createAuthRouteHandlers } from '@wiseiodev/dubs-auth';
import { auth } from '@/lib/dubs-auth';

export const { GET, POST } = createAuthRouteHandlers(auth);
```

## 4) Wire billing portal + webhook routes

- Billing portal route uses `createBillingRouteHandlers(...).portal.GET`.
- Webhook route uses `createBillingRouteHandlers(...).webhook.POST`.
- In `onWebhookEvent`, persist subscription state using:
- `toDubsSubscriptionEvent`
- `deriveSubscriptionPatchFromEvent`
- `upsertSubscriptionRecord`

## 5) Validate env at startup

```ts
import { validateDubsEnv } from '@wiseiodev/dubs-auth';

const env = validateDubsEnv(process.env);
```

Use validated `env` values when constructing `createDubsAuth`.
