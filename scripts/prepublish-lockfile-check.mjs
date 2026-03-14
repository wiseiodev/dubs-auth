import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const lockfilePath = new URL('../pnpm-lock.yaml', import.meta.url);
const before = readFileSync(lockfilePath, 'utf8');

execSync('COREPACK_ENABLE_PROJECT_SPEC=0 pnpm run refresh-deps', {
  stdio: 'inherit',
});

const after = readFileSync(lockfilePath, 'utf8');

if (before !== after) {
  console.error(
    [
      'Dependency refresh changed pnpm-lock.yaml.',
      'Commit the refreshed lockfile before publishing.',
    ].join(' '),
  );
  process.exit(1);
}
