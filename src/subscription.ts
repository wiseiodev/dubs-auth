import type Stripe from 'stripe';

import { resolvePlanByPriceId } from './plans';
import type { DubsPlanConfig, DubsRole } from './types';

export const BILLING_ROLES: readonly DubsRole[] = ['owner', 'admin'];

export interface DubsSubscriptionRecord {
  stripeSubscriptionId: string;
  status: string;
  planKey: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  cancelAt: Date | null;
  latestEventId: string | null;
}

export interface DubsSubscriptionPatch {
  stripeSubscriptionId: string;
  status: string;
  planKey: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  cancelAt: Date | null;
}

export interface DubsSubscriptionEvent {
  id: string;
  type:
    | 'customer.subscription.created'
    | 'customer.subscription.updated'
    | 'customer.subscription.deleted';
  object: {
    id: string;
    status: string;
    cancelAtPeriodEnd?: boolean;
    cancelAtUnix?: number | null;
    currentPeriodStartUnix?: number | null;
    currentPeriodEndUnix?: number | null;
    primaryPriceId?: string | null;
  };
}

const isBillingRole = (role: string): role is DubsRole =>
  BILLING_ROLES.includes(role as DubsRole);

export const hasBillingAccess = (role: string): boolean => isBillingRole(role);

export const toDubsSubscriptionEvent = (
  event: Stripe.Event,
): DubsSubscriptionEvent | null => {
  if (
    event.type !== 'customer.subscription.created' &&
    event.type !== 'customer.subscription.updated' &&
    event.type !== 'customer.subscription.deleted'
  ) {
    return null;
  }

  const subscription = event.data.object as Stripe.Subscription;
  const primaryItem = subscription.items.data[0];
  const primaryPriceId = primaryItem?.price.id ?? null;

  return {
    id: event.id,
    type: event.type,
    object: {
      id: subscription.id,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      cancelAtUnix: subscription.cancel_at,
      currentPeriodStartUnix: primaryItem?.current_period_start ?? null,
      currentPeriodEndUnix: primaryItem?.current_period_end ?? null,
      primaryPriceId,
    },
  };
};

const unixToDate = (value: number | null | undefined): Date | null =>
  typeof value === 'number' ? new Date(value * 1000) : null;

export const deriveSubscriptionPatchFromEvent = (
  event: DubsSubscriptionEvent,
  plans: readonly DubsPlanConfig[],
): DubsSubscriptionPatch => {
  const planKey = resolvePlanByPriceId(plans, event.object.primaryPriceId)?.key;

  return {
    stripeSubscriptionId: event.object.id,
    status: event.object.status,
    planKey: planKey ?? null,
    currentPeriodStart: unixToDate(event.object.currentPeriodStartUnix),
    currentPeriodEnd: unixToDate(event.object.currentPeriodEndUnix),
    cancelAtPeriodEnd: event.object.cancelAtPeriodEnd ?? false,
    cancelAt: unixToDate(event.object.cancelAtUnix),
  };
};

export const upsertSubscriptionRecord = (
  current: DubsSubscriptionRecord | null,
  patch: DubsSubscriptionPatch,
  eventId: string,
): DubsSubscriptionRecord => {
  if (current?.latestEventId === eventId) {
    return current;
  }

  return {
    stripeSubscriptionId: patch.stripeSubscriptionId,
    status: patch.status,
    planKey: patch.planKey,
    currentPeriodStart: patch.currentPeriodStart,
    currentPeriodEnd: patch.currentPeriodEnd,
    cancelAtPeriodEnd: patch.cancelAtPeriodEnd,
    cancelAt: patch.cancelAt,
    latestEventId: eventId,
  };
};
