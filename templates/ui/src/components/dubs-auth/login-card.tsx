'use client';

import type { SignInFormValues } from '@wiseiodev/dubs-auth';

import { DubsSignInForm } from '@wiseiodev/dubs-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface LoginCardProps {
  onSubmit: (values: SignInFormValues) => Promise<void>;
}

export const LoginCard = ({ onSubmit }: LoginCardProps) => (
  <Card className="mx-auto w-full max-w-md">
    <CardHeader>
      <CardTitle>Welcome back</CardTitle>
    </CardHeader>
    <CardContent>
      <DubsSignInForm onSubmit={onSubmit} />
    </CardContent>
  </Card>
);
