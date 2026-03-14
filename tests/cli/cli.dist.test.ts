import { execFile } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const repoRoot = path.resolve(currentDir, '../..');
const cliEntry = path.join(repoRoot, 'dist/cli/index.js');

const runBuiltCliWithOutput = async (args: string[]) =>
  execFileAsync(process.execPath, [cliEntry, ...args], {
    cwd: repoRoot,
  });

describe('dubs-auth built cli', () => {
  it('shows CLI help output', async () => {
    const { stdout } = await runBuiltCliWithOutput(['--help']);

    expect(stdout).toContain('Quickstart and scaffolding CLI');
    expect(stdout).toContain('init');
    expect(stdout).toContain('generate');
    expect(stdout).toContain('add');
  });

  it('shows command help after unknown commands', async () => {
    await expect(
      runBuiltCliWithOutput(['not-a-real-command']),
    ).rejects.toMatchObject({
      code: 1,
      stderr: expect.stringContaining('Usage: dubs-auth'),
    });
  });
});
