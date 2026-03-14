import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Dubs Auth Next.js Example',
  description: 'Example App Router integration for @wiseiodev/dubs-auth',
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/sign-up', label: 'Sign up' },
  { href: '/sign-in', label: 'Sign in' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/billing', label: 'Billing' },
];

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <main>
          <header className='card stack' style={{ marginBottom: '1rem' }}>
            <h1 style={{ margin: 0 }}>Dubs Auth Example</h1>
            <nav className='row'>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
