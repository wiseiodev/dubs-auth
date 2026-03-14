---
name: dubs-auth-skill
description: Use when integrating @wiseiodev/dubs-auth in a Next.js App Router app with Better Auth, Stripe subscriptions, and Drizzle schema wiring, including CLI scaffolding, route setup, env validation, billing portal, webhook sync, and client auth UX.
---

# Dubs Auth Integration Skill

Guide for implementing `@wiseiodev/dubs-auth` cleanly in consumer applications.

## When To Use

- User asks to set up `dubs-auth`, Better Auth + Stripe + Drizzle, or Next.js
  auth/billing routes.
- User asks how to use package exports like `createDubsAuth`,
  `createBillingRouteHandlers`, `createDubsAuthClient`, or subscription helpers.
- User needs troubleshooting for webhook sync, billing portal redirects, or env
  wiring.

## When Not To Use

- Maintaining this library's internal release/build/test workflows.
- Non-Next.js stacks that do not use App Router style route handlers.

## Workflow (Follow In Order)

1. Discover app context first.
   - Detect package manager, Next.js App Router presence, DB adapter usage, and
     whether auth/billing routes already exist.
   - Reuse existing app conventions before suggesting new structure.
2. Plan the smallest vertical slice.
   - Install package.
   - Scaffold with CLI (`init`, `generate schema`) when useful.
   - Wire env + `createDubsAuth` + `/api/auth/[...all]`.
3. Add billing flow.
   - Wire `/api/billing/portal` and `/api/stripe/webhook`.
   - Resolve Stripe customer ID from current identity.
4. Add subscription persistence.
   - Normalize Stripe events with `toDubsSubscriptionEvent`.
   - Build patch via `deriveSubscriptionPatchFromEvent`.
   - Apply idempotent upsert via `upsertSubscriptionRecord`.
5. Provide concrete verification.
   - Include exact commands and route checks.
   - Include expected success/failure signals.
   - Prefer the `examples/next-app-router` flow as the default verification
     baseline.

## Response Rules

- Best-practice-first guidance: production-safe defaults, explicit error
  handling, and idempotent webhook processing.
- Keep guidance grounded in real package exports and templates. Do not invent
  APIs.
- Prefer complete copy-paste snippets tied to concrete file locations.
- Always end with targeted validation commands and quick rollback/debug steps.

## Verification Baseline (Use This First)

```bash
pnpm --dir examples/next-app-router install
pnpm --dir examples/next-app-router exec dubs-auth generate schema --cwd .
cp examples/next-app-router/.env.example examples/next-app-router/.env
pnpm --dir examples/next-app-router db:migrate
PORT=4000 pnpm --dir examples/next-app-router dev
```

Validate in order:

1. `/sign-up` can create an account.
2. `/sign-in` can authenticate that account.
3. `/dashboard` shows sessioned state.
4. `/billing` works for signed-in users.

Expected Stripe-optional behavior:

- If Stripe env vars are unset, billing portal/webhook routes should return a
  clear "not configured" response instead of crashing the app.

## Troubleshooting Quick Fixes

If local PGlite files are unstable, reset and remigrate:

```bash
pnpm --dir examples/next-app-router exec node --input-type=module -e "import { rm } from 'node:fs/promises'; await rm('.data/dubs-auth', { recursive: true, force: true }); await rm('.data/dubs-auth-wal', { force: true }); await rm('.data/dubs-auth-shm', { force: true });"
pnpm --dir examples/next-app-router db:migrate
```

If auth requests hit the wrong port in local dev, ensure auth client/server
base URL resolves to the current origin/port.

## Reference Loading Map

- Bootstrap and scaffold flow:
  `references/bootstrap-and-scaffold.md`
- Runtime exports and usage patterns:
  `references/runtime-api-guide.md`
- Billing portal + webhook + idempotent subscription sync:
  `references/billing-webhook-patterns.md`
- Troubleshooting and production hardening:
  `references/troubleshooting-and-hardening.md`
