import Link from 'next/link';

export default function HomePage() {
  return (
    <section className='card stack'>
      <h2 style={{ margin: 0 }}>What this example shows</h2>
      <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
        <li>App Router auth handlers wired with `createAuthRouteHandlers`</li>
        <li>Client sign-up/sign-in wired with `createDubsAuthClient`</li>
        <li>PGlite + Drizzle migrations for local setup without Docker</li>
        <li>
          Billing route and button flow that is optional until Stripe is set
        </li>
      </ul>
      <div className='row'>
        <Link href='/sign-up'>Create account</Link>
        <Link href='/sign-in'>Sign in</Link>
        <Link href='/dashboard'>Open dashboard</Link>
      </div>
    </section>
  );
}
