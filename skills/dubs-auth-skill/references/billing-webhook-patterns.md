# Billing And Webhook Patterns

Use this reference to implement Stripe billing routes with safe subscription
synchronization.

## Billing Portal Route Pattern

`createBillingRouteHandlers` requires:

- `stripeSecretKey`
- `stripeWebhookSecret`
- `getCustomerId(request)`
- optional `getReturnUrl(request)`
- optional `onWebhookEvent(event)`

Portal flow:

1. Resolve current actor from request/session.
2. Resolve actor -> Stripe customer ID.
3. Return `403` when customer is missing.
4. Create billing portal session and return JSON `{ url }`.

Best-practice notes:

- Do not trust client-supplied customer IDs.
- Keep customer mapping in server-side identity records.
- Use explicit return URL logic for multi-tenant apps.

## Webhook Route Pattern

Webhook flow:

1. Read `stripe-signature` header.
2. Reject missing signature with `400`.
3. Verify event via Stripe SDK + webhook secret.
4. Invoke persistence logic in `onWebhookEvent`.
5. Return acknowledgement response.

Best-practice notes:

- Never parse webhook body as JSON before signature verification.
- Keep webhook handler fast; offload non-critical side effects.
- Log event id + type for observability.

## Idempotent Subscription Sync

Use package helpers in this order:

1. `toDubsSubscriptionEvent(stripeEvent)`
2. `deriveSubscriptionPatchFromEvent(dubsEvent, plans)`
3. `upsertSubscriptionRecord(currentRecord, patch, dubsEvent.id)`

### Example Shape

```ts
const dubsEvent = toDubsSubscriptionEvent(event);
if (!dubsEvent) return;

const patch = deriveSubscriptionPatchFromEvent(dubsEvent, plans);
const current = await loadSubscriptionByStripeId(patch.stripeSubscriptionId);
const next = upsertSubscriptionRecord(current, patch, dubsEvent.id);

if (next !== current) {
  await saveSubscription(next);
}
```

## Production Hardening

- Persist `latestEventId` for idempotency checks.
- Add a unique DB constraint on `stripeSubscriptionId`.
- Handle out-of-order updates by comparing timestamps if needed by app logic.
- Keep plan resolution robust when price IDs are rotated.
- Alert on repeated webhook verification failures.
