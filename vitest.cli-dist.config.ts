import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'cli-dist',
    environment: 'node',
    include: ['tests/cli/cli.dist.test.ts'],
  },
});
