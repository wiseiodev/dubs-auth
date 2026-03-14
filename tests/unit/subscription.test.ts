import { describe, expect, it } from 'vitest';

import {
  type DubsSubscriptionEvent,
  deriveSubscriptionPatchFromEvent,
  hasBillingAccess,
  upsertSubscriptionRecord,
} from '../../src/subscription';
import type { DubsPlanConfig } from '../../src/types';

const plans: DubsPlanConfig[] = [
  {
    key: 'starter',
    displayName: 'Starter',
    prices: {
      monthly: 'price_monthly_starter',
      annual: 'price_annual_starter',
    },
  },
];

const event: DubsSubscriptionEvent = {
  id: 'evt_1',
  type: 'customer.subscription.updated',
  object: {
    id: 'sub_123',
    status: 'active',
    cancelAtPeriodEnd: false,
    cancelAtUnix: null,
    currentPeriodStartUnix: 1730000000,
    currentPeriodEndUnix: 1732600000,
    primaryPriceId: 'price_monthly_starter',
  },
};

describe('subscription helpers', () => {
  it('accepts billing roles', () => {
    expect(hasBillingAccess('owner')).toBe(true);
    expect(hasBillingAccess('admin')).toBe(true);
    expect(hasBillingAccess('member')).toBe(false);
  });

  it('derives a patch from stripe-like events', () => {
    const patch = deriveSubscriptionPatchFromEvent(event, plans);

    expect(patch.stripeSubscriptionId).toBe('sub_123');
    expect(patch.status).toBe('active');
    expect(patch.planKey).toBe('starter');
  });

  it('is idempotent when the same event id is re-applied', () => {
    const patch = deriveSubscriptionPatchFromEvent(event, plans);

    const first = upsertSubscriptionRecord(null, patch, event.id);
    const second = upsertSubscriptionRecord(first, patch, event.id);

    expect(second).toEqual(first);
  });
});
