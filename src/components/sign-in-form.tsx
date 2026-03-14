'use client';

import { type FormEvent, useState } from 'react';

import { cn } from '../lib/cn';

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface DubsSignInFormProps {
  onSubmit: (values: SignInFormValues) => Promise<void>;
  className?: string;
  submitLabel?: string;
}

export const DubsSignInForm = ({
  onSubmit,
  className,
  submitLabel = 'Sign in',
}: DubsSignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      await onSubmit({ email, password });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Could not sign in.',
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={cn('grid gap-4', className)} onSubmit={handleSubmit}>
      <label className="grid gap-1 text-sm font-medium">
        Email
        <input
          className="h-10 rounded-md border px-3"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Password
        <input
          className="h-10 rounded-md border px-3"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Signing in...' : submitLabel}
      </button>
    </form>
  );
};
