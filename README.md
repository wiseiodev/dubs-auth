# `@wiseiodev/dubs-auth`

All-in-one Better Auth + Stripe + Drizzle toolkit for Next.js App Router apps.

## Stack

- Next.js (App Router)
- Better Auth
- Stripe
- Drizzle ORM
- Zod
- Biome
- Vitest (unit, integration, browser UI)

## Requirements

- Node `24` (`.nvmrc` included)
- pnpm `10.31.0` via `packageManager`

## Install

```bash
pnpm add @wiseiodev/dubs-auth
```

## Quickstart CLI

```bash
# scaffold env template, config, and route handlers
pnpm dubs-auth init

# generate local schema ownership files
pnpm dubs-auth generate schema

# copy customizable UI source
pnpm dubs-auth add ui

# copy customizable hooks source
pnpm dubs-auth add hooks
```

## Runtime Usage

```ts
import {
  createAuthRouteHandlers,
  createDubsAuth,
  dubsAuthSchema,
} from '@wiseiodev/dubs-auth';

export const auth = createDubsAuth({
  baseUrl: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  database: db,
  databaseSchema: dubsAuthSchema,
  providers: {
    emailPassword: { enabled: true },
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    plans: [
      {
        key: 'starter',
        displayName: 'Starter',
        prices: {
          monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!,
          annual: process.env.STRIPE_STARTER_ANNUAL_PRICE_ID!,
        },
      },
    ],
  },
});

export const { GET, POST } = createAuthRouteHandlers(auth);
```

## Scripts

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:ui
pnpm refresh-deps
```
