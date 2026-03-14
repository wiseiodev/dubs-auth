'use client';

import { useState } from 'react';

import { cn } from '../lib/cn';

export interface DubsManageBillingButtonProps {
  onManage: () => Promise<void>;
  className?: string;
  label?: string;
}

export const DubsManageBillingButton = ({
  onManage,
  className,
  label = 'Manage billing',
}: DubsManageBillingButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    try {
      await onManage();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium disabled:opacity-60',
        className,
      )}
      disabled={isPending}
      onClick={handleClick}
      type="button"
    >
      {isPending ? 'Redirecting...' : label}
    </button>
  );
};
