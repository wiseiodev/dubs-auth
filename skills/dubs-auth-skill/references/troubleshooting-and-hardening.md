# Troubleshooting And Hardening

Use this checklist when integration behavior is unclear or unstable.

## Common Failures

### `validateDubsEnv` Throws

Likely causes:

- Missing required env variables
- Invalid URL format in `BETTER_AUTH_URL` or `NEXT_PUBLIC_BETTER_AUTH_URL`

Fix:

- Compare app env file with `.env.dubs-auth.example`.
- Validate environment loading in runtime where auth is initialized.

### Billing Portal Returns 403

Likely cause:

- `getCustomerId` returned `null`

Fix:

- Ensure user/org identity is linked to Stripe customer ID in DB.
- Verify active organization context in multi-tenant sessions.

### Webhook Returns 400

Likely causes:

- Missing `stripe-signature`
- Wrong `STRIPE_WEBHOOK_SECRET`
- Request body transformed before signature verification

Fix:

- Ensure raw request body is used for verification.
- Verify endpoint secret from Stripe dashboard/CLI.

### Plan Does Not Resolve

Likely cause:

- Stripe price ID from webhook does not match configured plan IDs

Fix:

- Align app plan config and Stripe dashboard price IDs.
- Use `resolvePlanByPriceId` to debug mapping quickly.

## Hardening Checklist

- Startup:
  - Validate env at process start.
  - Fail fast on missing Stripe/Better Auth secrets.
- API:
  - Ensure auth and billing routes are server-only handlers.
  - Return clear JSON errors for expected failure modes.
- Data:
  - Keep unique subscription identifiers.
  - Preserve latest processed webhook event id.
- Security:
  - Restrict billing actions by role (`owner`/`admin` baseline).
  - Keep Stripe secrets server-only.
- Observability:
  - Log route errors with request context (without secrets).
  - Track webhook event type volume and failure rates.

## Validation Commands

```bash
pnpm typecheck
pnpm test:unit
pnpm test:integration
```

Minimal runtime checks:

- Auth route can answer sign-in/sign-up requests.
- Billing portal route returns a URL for a known mapped customer.
- Webhook route accepts a valid signed test event.
