# Next.js App Router Example (`@wiseiodev/dubs-auth`)

This example is a runnable Next.js App Router app that demonstrates:

- Server setup with `createDubsAuth` + `createAuthRouteHandlers`
- Client setup with `createDubsAuthClient` + `DubsSignInForm`/`DubsSignUpForm`
- Optional billing portal wiring with `createBillingRouteHandlers`
- Schema scaffolding via `pnpm exec dubs-auth generate schema`
- Local database setup with PGlite + committed Drizzle migrations

## 1) Install

```bash
pnpm --dir examples/next-app-router install
```

## 2) Scaffold schema ownership files

```bash
pnpm --dir examples/next-app-router exec dubs-auth generate schema --cwd .
```

## 3) Configure env

```bash
cp examples/next-app-router/.env.example examples/next-app-router/.env
```

Required for auth:

- `BETTER_AUTH_SECRET`
- `DATABASE_URL`

`BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` are optional for local dev.
The example uses the active app origin/port automatically.

Stripe is optional. If Stripe vars are omitted, billing/webhook routes return a
clear "not configured" response.

## 4) Apply DB migration

```bash
pnpm --dir examples/next-app-router db:migrate
```

## 5) Run app

```bash
pnpm --dir examples/next-app-router dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Verification quick path

1. Sign up on `/sign-up`
2. Sign in on `/sign-in`
3. Confirm session state appears on `/dashboard`
4. Open `/billing` to verify billing route behavior

## Notes

- This example depends on the published npm package `@wiseiodev/dubs-auth@0.3.0`.
- It intentionally uses the generated `src/db/dubs-auth-schema.ts` file from
  the CLI command so the sample matches real consumer setup.
- `dubs-auth init` is shown in the project-level docs for full route/config
  scaffolding; this sample keeps custom route/config wiring to make Stripe
  optional by default.
