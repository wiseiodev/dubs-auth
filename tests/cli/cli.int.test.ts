import { execFile } from 'node:child_process';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { afterEach, describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const repoRoot = path.resolve(currentDir, '../..');
const cliEntry = path.join(repoRoot, 'src/cli/index.ts');

const createdTempDirs: string[] = [];

const runCli = async (args: string[]) => {
  await execFileAsync(
    process.execPath,
    ['--import', 'tsx', cliEntry, ...args],
    { cwd: repoRoot },
  );
};

describe('dubs-auth cli', () => {
  afterEach(async () => {
    await Promise.all(
      createdTempDirs.map((directory) =>
        rm(directory, { recursive: true, force: true }),
      ),
    );
    createdTempDirs.length = 0;
  });

  it('scaffolds init and schema files', async () => {
    const tempDirectory = await mkdtemp(path.join(tmpdir(), 'dubs-auth-cli-'));
    createdTempDirs.push(tempDirectory);

    await runCli(['init', '--cwd', tempDirectory]);
    await runCli(['init', '--cwd', tempDirectory]);
    await runCli(['generate', 'schema', '--cwd', tempDirectory]);
    await runCli(['generate', 'schema', '--cwd', tempDirectory]);

    await expect(
      access(path.join(tempDirectory, '.env.dubs-auth.example')),
    ).resolves.toBeUndefined();
    await expect(
      access(path.join(tempDirectory, 'src/db/dubs-auth-schema.ts')),
    ).resolves.toBeUndefined();
    await expect(
      access(path.join(tempDirectory, 'drizzle/0001_dubs_auth.sql')),
    ).resolves.toBeUndefined();

    const generatedSchema = await readFile(
      path.join(tempDirectory, 'src/db/dubs-auth-schema.ts'),
      'utf8',
    );
    expect(generatedSchema).toContain(
      "export const account = pgTable('account'",
    );
    expect(generatedSchema).toContain(
      "export const verification = pgTable('verification'",
    );
    expect(generatedSchema).toContain(
      "export const invitation = pgTable('invitation'",
    );

    const generatedMigration = await readFile(
      path.join(tempDirectory, 'drizzle/0001_dubs_auth.sql'),
      'utf8',
    );
    expect(generatedMigration).toContain(
      'CREATE TABLE IF NOT EXISTS "account"',
    );
    expect(generatedMigration).toContain(
      'CREATE TABLE IF NOT EXISTS "verification"',
    );
    expect(generatedMigration).toContain(
      'CREATE TABLE IF NOT EXISTS "invitation"',
    );
  });
});
