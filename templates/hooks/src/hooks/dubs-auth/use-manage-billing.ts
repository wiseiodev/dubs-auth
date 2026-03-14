'use client';

import { useBillingPortal } from '@wiseiodev/dubs-auth';

export const useManageBilling = () => {
  const { isLoading, openBillingPortal } = useBillingPortal();

  return {
    isLoading,
    openBillingPortal,
  };
};
