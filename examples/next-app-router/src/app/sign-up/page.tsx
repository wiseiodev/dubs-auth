'use client';

import { DubsSignUpForm, type SignUpFormValues } from '@wiseiodev/dubs-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (values: SignUpFormValues) => {
    const result = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      throw new Error(result.error.message ?? 'Could not create account.');
    }

    router.push('/dashboard');
  };

  return (
    <section className='card stack'>
      <h2 style={{ margin: 0 }}>Create account</h2>
      <DubsSignUpForm onSubmit={onSubmit} />
      <p style={{ margin: 0 }}>
        Already registered? <Link href='/sign-in'>Sign in</Link>
      </p>
    </section>
  );
}
