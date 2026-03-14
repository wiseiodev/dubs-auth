# Environment Variables

`validateDubsEnv` validates these runtime variables:

| Variable | Required | Description |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Better Auth secret key. |
| `BETTER_AUTH_URL` | Yes | Base URL for Better Auth server (for example `http://localhost:3000`). |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | No | Public Better Auth URL for browser-side usage. |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_*`). |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret (`whsec_*`). |

## Common plan price IDs

These are used by the generated templates and plan examples:

- `STRIPE_STARTER_MONTHLY_PRICE_ID`
- `STRIPE_STARTER_ANNUAL_PRICE_ID`
- `STRIPE_PRO_MONTHLY_PRICE_ID`
- `STRIPE_PRO_ANNUAL_PRICE_ID`

## Example `.env`

```bash
BETTER_AUTH_SECRET=replace-me
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me

STRIPE_STARTER_MONTHLY_PRICE_ID=price_replace_me
STRIPE_STARTER_ANNUAL_PRICE_ID=price_replace_me
STRIPE_PRO_MONTHLY_PRICE_ID=price_replace_me
STRIPE_PRO_ANNUAL_PRICE_ID=price_replace_me
```
