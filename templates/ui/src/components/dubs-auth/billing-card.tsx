'use client';

import { DubsManageBillingButton } from '@wiseiodev/dubs-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface BillingCardProps {
  onManageBilling: () => Promise<void>;
}

export const BillingCard = ({ onManageBilling }: BillingCardProps) => (
  <Card className='w-full'>
    <CardHeader>
      <CardTitle>Billing</CardTitle>
    </CardHeader>
    <CardContent>
      <DubsManageBillingButton onManage={onManageBilling} />
    </CardContent>
  </Card>
);
