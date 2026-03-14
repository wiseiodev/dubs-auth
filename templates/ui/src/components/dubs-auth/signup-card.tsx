'use client';

import type { SignUpFormValues } from '@wiseiodev/dubs-auth';

import { DubsSignUpForm } from '@wiseiodev/dubs-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface SignupCardProps {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
}

export const SignupCard = ({ onSubmit }: SignupCardProps) => (
  <Card className='mx-auto w-full max-w-md'>
    <CardHeader>
      <CardTitle>Create your account</CardTitle>
    </CardHeader>
    <CardContent>
      <DubsSignUpForm onSubmit={onSubmit} />
    </CardContent>
  </Card>
);
