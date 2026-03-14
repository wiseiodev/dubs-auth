# Integration Recipes

For a complete runnable reference app, see:

- `examples/next-app-router` in this repository.
- The example uses the published npm package and committed migrations so it can
  be verified locally without Docker.

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

## 6) Verify end-to-end quickly (consumer flow)

```bash
pnpm --dir examples/next-app-router install
pnpm --dir examples/next-app-router exec dubs-auth generate schema --cwd .
cp examples/next-app-router/.env.example examples/next-app-router/.env
pnpm --dir examples/next-app-router db:migrate
PORT=4000 pnpm --dir examples/next-app-router dev
```

Then test `/sign-up`, `/sign-in`, `/dashboard`, and `/billing`.

## 7) Local PGlite reset (if needed)

If local DB files get into a bad state, reset and remigrate:

```bash
pnpm --dir examples/next-app-router exec node --input-type=module -e "import { rm } from 'node:fs/promises'; await rm('.data/dubs-auth', { recursive: true, force: true }); await rm('.data/dubs-auth-wal', { force: true }); await rm('.data/dubs-auth-shm', { force: true });"
pnpm --dir examples/next-app-router db:migrate
```
