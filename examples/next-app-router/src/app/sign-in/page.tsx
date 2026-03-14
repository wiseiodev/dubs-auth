'use client';

import { DubsSignInForm, type SignInFormValues } from '@wiseiodev/dubs-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();

  const onSubmit = async (values: SignInFormValues) => {
    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      throw new Error(result.error.message ?? 'Could not sign in.');
    }

    router.push('/dashboard');
  };

  return (
    <section className='card stack'>
      <h2 style={{ margin: 0 }}>Sign in</h2>
      <DubsSignInForm onSubmit={onSubmit} />
      <p style={{ margin: 0 }}>
        Need an account? <Link href='/sign-up'>Sign up</Link>
      </p>
    </section>
  );
}
