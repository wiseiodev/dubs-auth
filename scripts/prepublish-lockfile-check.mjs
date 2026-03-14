import { execSync } from 'node:child_process';

try {
  execSync(
    'COREPACK_ENABLE_PROJECT_SPEC=0 pnpm install --frozen-lockfile --ignore-scripts',
    {
      stdio: 'inherit',
    },
  );
} catch (error) {
  console.error(
    [
      'Lockfile validation failed.',
      'Run `pnpm install` and commit the updated pnpm-lock.yaml before publishing.',
    ].join(' '),
  );
  throw error;
}
