'use client';

import { type FormEvent, useState } from 'react';

import { cn } from '../lib/cn';

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

export interface DubsSignUpFormProps {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
  className?: string;
  submitLabel?: string;
}

export const DubsSignUpForm = ({
  onSubmit,
  className,
  submitLabel = 'Create account',
}: DubsSignUpFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      await onSubmit({ name, email, password });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Could not create the account.',
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={cn('grid gap-4', className)} onSubmit={handleSubmit}>
      <label className="grid gap-1 text-sm font-medium">
        Name
        <input
          className="h-10 rounded-md border px-3"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
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
          autoComplete="new-password"
          minLength={8}
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
        {isPending ? 'Creating account...' : submitLabel}
      </button>
    </form>
  );
};
