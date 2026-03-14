import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'integration',
    environment: 'node',
    include: [
      'tests/integration/**/*.int.test.ts',
      'tests/cli/**/*.int.test.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
