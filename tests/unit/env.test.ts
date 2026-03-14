import { describe, expect, it } from 'vitest';

import { validateDubsEnv } from '../../src/env';

describe('validateDubsEnv', () => {
  it('parses a valid env object', () => {
    const env = validateDubsEnv({
      BETTER_AUTH_SECRET: 'secret',
      BETTER_AUTH_URL: 'https://example.com',
      NEXT_PUBLIC_BETTER_AUTH_URL: 'https://example.com',
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_WEBHOOK_SECRET: 'whsec_123',
    });

    expect(env.BETTER_AUTH_SECRET).toBe('secret');
    expect(env.BETTER_AUTH_URL).toBe('https://example.com');
  });

  it('throws for missing values', () => {
    expect(() =>
      validateDubsEnv({
        BETTER_AUTH_SECRET: '',
        BETTER_AUTH_URL: 'https://example.com',
        STRIPE_SECRET_KEY: 'sk_test_123',
        STRIPE_WEBHOOK_SECRET: 'whsec_123',
      }),
    ).toThrow();
  });
});
