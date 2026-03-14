'use client';

import {
  DubsManageBillingButton,
  useBillingPortal,
} from '@wiseiodev/dubs-auth';

import { authClient } from '@/lib/auth-client';

export default function BillingPage() {
  const { data: session, isPending } = authClient.useSession();
  const { openBillingPortal } = useBillingPortal();

  const onManage = async () => {
    await openBillingPortal();
  };

  if (isPending) {
    return (
      <section className='card'>
        <p style={{ margin: 0 }}>Loading session...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className='card'>
        <p style={{ margin: 0 }}>
          Sign in first. Billing portal requests require an authenticated user.
        </p>
      </section>
    );
  }

  return (
    <section className='card stack'>
      <h2 style={{ margin: 0 }}>Billing</h2>
      <p style={{ margin: 0 }}>
        If Stripe is configured and a customer is linked, this redirects to the
        Stripe billing portal.
      </p>
      <DubsManageBillingButton onManage={onManage} />
    </section>
  );
}
