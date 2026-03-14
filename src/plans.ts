import type { DubsPlanConfig } from './types';

export const getPlanByKey = (
  plans: readonly DubsPlanConfig[],
  planKey: string,
): DubsPlanConfig | null => plans.find((plan) => plan.key === planKey) ?? null;

export const getPlanLimits = (
  plans: readonly DubsPlanConfig[],
  planKey: string,
): Record<string, number> => getPlanByKey(plans, planKey)?.limits ?? {};

export const resolvePlanByPriceId = (
  plans: readonly DubsPlanConfig[],
  priceId: string | null | undefined,
): DubsPlanConfig | null => {
  if (!priceId) {
    return null;
  }
  return (
    plans.find(
      (plan) =>
        plan.prices.monthly === priceId || plan.prices.annual === priceId,
    ) ?? null
  );
};

export const toBetterAuthStripePlans = (
  plans: readonly DubsPlanConfig[],
): Array<{
  name: string;
  priceId: string;
  annualDiscountPriceId?: string;
  limits?: Record<string, number>;
}> =>
  plans.map((plan) => ({
    name: plan.key,
    priceId: plan.prices.monthly,
    ...(plan.prices.annual
      ? { annualDiscountPriceId: plan.prices.annual }
      : {}),
    ...(plan.limits ? { limits: plan.limits } : {}),
  }));
