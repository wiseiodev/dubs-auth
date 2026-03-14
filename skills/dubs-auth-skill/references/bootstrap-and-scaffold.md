# Bootstrap And Scaffold

Use this flow to set up `@wiseiodev/dubs-auth` in a consumer app.

## Prerequisites

- Node `24+`
- pnpm `10+`
- Next.js App Router project
- Database connection ready for Better Auth + Drizzle
- Stripe account with product price IDs

## Install Package

```bash
pnpm add @wiseiodev/dubs-auth
```

Use the CLI through pnpm exec:

```bash
pnpm exec dubs-auth --help
```

## Scaffold Baseline Files

```bash
pnpm exec dubs-auth init
pnpm exec dubs-auth generate schema
```

Common generated files:

- `.env.dubs-auth.example`
- `dubs-auth.config.ts`
- `src/lib/dubs-auth.ts`
- `src/app/api/auth/[...all]/route.ts`
- `src/app/api/billing/portal/route.ts`
- `src/app/api/stripe/webhook/route.ts`
- `src/db/dubs-auth-schema.ts`
- `drizzle/0001_dubs_auth.sql`

Optional source-editable additions:

```bash
pnpm exec dubs-auth add ui
pnpm exec dubs-auth add hooks
```

## Environment Variables

Required:

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Usually required for browser + plans:

- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `STRIPE_STARTER_MONTHLY_PRICE_ID`
- `STRIPE_STARTER_ANNUAL_PRICE_ID`
- `STRIPE_PRO_MONTHLY_PRICE_ID`
- `STRIPE_PRO_ANNUAL_PRICE_ID`

Validate at startup:

```ts
import { validateDubsEnv } from '@wiseiodev/dubs-auth';

const env = validateDubsEnv(process.env);
```

## Route Wiring

Auth route:

```ts
import { createAuthRouteHandlers } from '@wiseiodev/dubs-auth';
import { auth } from '@/lib/dubs-auth';

export const { GET, POST } = createAuthRouteHandlers(auth);
```

Billing portal + webhook routes come from `createBillingRouteHandlers` and
require Stripe secrets and app-specific customer mapping logic.

## Quick Verification

```bash
pnpm exec dubs-auth --help
pnpm exec dubs-auth help init
pnpm typecheck
```

Runtime checks:

- `/api/auth/[...all]` route responds without runtime config errors.
- `/api/billing/portal` returns `403` with clear error if no customer is mapped.
- `/api/stripe/webhook` returns `400` for missing/invalid signature.
