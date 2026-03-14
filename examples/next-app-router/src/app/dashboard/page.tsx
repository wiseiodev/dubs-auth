'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const onSignOut = async () => {
    await authClient.signOut();
    router.push('/sign-in');
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
      <section className='card stack'>
        <h2 style={{ margin: 0 }}>You are signed out</h2>
        <p style={{ margin: 0 }}>
          Sign in to verify session access and protected views.
        </p>
        <Link href='/sign-in'>Go to sign in</Link>
      </section>
    );
  }

  return (
    <section className='card stack'>
      <h2 style={{ margin: 0 }}>Dashboard</h2>
      <p style={{ margin: 0 }}>
        Signed in as <strong>{session.user.email}</strong>
      </p>
      <div className='row'>
        <Link href='/billing'>Manage billing</Link>
        <button onClick={onSignOut} type='button'>
          Sign out
        </button>
      </div>
    </section>
  );
}
