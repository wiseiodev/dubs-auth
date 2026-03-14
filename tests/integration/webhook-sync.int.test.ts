import type Stripe from 'stripe';
import { describe, expect, it } from 'vitest';

import {
  deriveSubscriptionPatchFromEvent,
  toDubsSubscriptionEvent,
} from '../../src/subscription';
import type { DubsPlanConfig } from '../../src/types';

const plans: DubsPlanConfig[] = [
  {
    key: 'starter',
    displayName: 'Starter',
    prices: {
      monthly: 'price_monthly_starter',
    },
  },
];

describe('stripe webhook transformation', () => {
  it('normalizes subscription events for db sync', () => {
    const stripeEvent = {
      id: 'evt_123',
      type: 'customer.subscription.created',
      data: {
        object: {
          id: 'sub_123',
          status: 'active',
          cancel_at_period_end: false,
          cancel_at: null,
          current_period_start: 1730000000,
          current_period_end: 1732600000,
          items: {
            data: [{ price: { id: 'price_monthly_starter' } }],
          },
        },
      },
    } as unknown as Stripe.Event;

    const normalized = toDubsSubscriptionEvent(stripeEvent);
    expect(normalized).not.toBeNull();

    if (!normalized) {
      throw new Error('Expected normalized event payload');
    }

    const patch = deriveSubscriptionPatchFromEvent(normalized, plans);
    expect(patch.planKey).toBe('starter');
    expect(patch.status).toBe('active');
  });
});
