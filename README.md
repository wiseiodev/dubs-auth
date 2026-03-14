# `@wiseiodev/dubs-auth`

All-in-one Better Auth + Stripe + Drizzle toolkit for Next.js App Router apps.

## Requirements

- Node `24` (`.nvmrc` included)
- pnpm `10.31.0` via `packageManager`

## Install

```bash
pnpm add @wiseiodev/dubs-auth
```

To use the CLI in a consuming app, run via pnpm exec:

```bash
pnpm exec dubs-auth --help
```

## Quick Start

```bash
# scaffold env template, config, and Next route handlers
pnpm exec dubs-auth init

# generate schema ownership files for your host app
pnpm exec dubs-auth generate schema
```

## Runtime Example

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

## Docs

- [Imports and API surface](./docs/usage/imports.md)
- [Environment variables](./docs/usage/environment.md)
- [CLI reference (`--help`, commands, flags)](./docs/usage/cli.md)
- [Integration recipes](./docs/usage/integration-recipes.md)

## CLI Help

```bash
pnpm exec dubs-auth --help
pnpm exec dubs-auth help init
```

## Local Development

```bash
pnpm lint
pnpm run format:check
pnpm typecheck
pnpm test
pnpm build
pnpm run quality
```

For CLI development inside this repository:

```bash
# run source directly
node --import tsx src/cli/index.ts --help

# run built artifact
node dist/cli/index.js --help
```

## Commit Convention

This repo uses Conventional Commits with a required scope.

- Pass: `feat(cli): add --help coverage`
- Fail: `feat: add --help coverage`

Husky runs commitlint on `commit-msg` locally.

Run `pnpm install` once per clone to install hooks via `prepare`.
