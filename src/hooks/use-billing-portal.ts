'use client';

import { useState } from 'react';

import type { DubsBillingPortalResponse } from '../types';

export interface UseBillingPortalOptions {
  endpoint?: string;
}

export interface UseBillingPortalResult {
  isLoading: boolean;
  openBillingPortal: () => Promise<void>;
}

export const useBillingPortal = (
  options: UseBillingPortalOptions = {},
): UseBillingPortalResult => {
  const endpoint = options.endpoint ?? '/api/billing/portal';
  const [isLoading, setIsLoading] = useState(false);

  const openBillingPortal = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Could not create a billing portal session.');
      }
      const data = (await response.json()) as DubsBillingPortalResponse;
      window.location.href = data.url;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    openBillingPortal,
  };
};
