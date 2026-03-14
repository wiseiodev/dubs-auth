import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command, Option } from 'commander';

import packageJson from '../../package.json';
import { type CopyContext, copyDirectory } from './file-utils';

interface CommandOptions {
  cwd: string;
  dryRun: boolean;
  force: boolean;
}

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const templateRoot = path.resolve(currentDir, '../../templates');

const resolveContext = (options: CommandOptions): CopyContext => ({
  cwd: path.resolve(process.cwd(), options.cwd),
  dryRun: options.dryRun,
  force: options.force,
});

const printResult = (
  context: CopyContext,
  actionName: string,
  files: string[],
): void => {
  if (files.length === 0) {
    console.log(`[dubs-auth] ${actionName}: no files changed`);
    return;
  }

  console.log(
    `[dubs-auth] ${actionName}: ${context.dryRun ? 'would write' : 'wrote'} ${
      files.length
    } file(s)`,
  );
  for (const file of files) {
    console.log(`  - ${file}`);
  }
};

const ensureDirectoryExists = async (directoryPath: string): Promise<void> => {
  const exists = await stat(directoryPath)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    throw new Error(`Directory does not exist: ${directoryPath}`);
  }
};

const copyTemplateSet = async (
  templateSetName: 'init' | 'schema' | 'ui' | 'hooks',
  actionName: string,
  options: CommandOptions,
): Promise<void> => {
  const context = resolveContext(options);
  const sourceDirectory = path.join(templateRoot, templateSetName);

  await ensureDirectoryExists(sourceDirectory);
  await ensureDirectoryExists(context.cwd);

  const changedFiles = await copyDirectory(
    sourceDirectory,
    context.cwd,
    context,
  );
  printResult(context, actionName, changedFiles);
};

const command = new Command()
  .name('dubs-auth')
  .description(
    'Quickstart and scaffolding CLI for @wiseiodev/dubs-auth integrations',
  )
  .showHelpAfterError()
  .showSuggestionAfterError()
  .helpCommand('help [command]', 'Display help for command')
  .version(packageJson.version)
  .addOption(
    new Option('--cwd <path>', 'Target app path to modify').default('.'),
  )
  .addOption(
    new Option('--dry-run', 'Preview files without writing').default(false),
  )
  .addOption(
    new Option('--force', 'Overwrite existing files even when changed').default(
      false,
    ),
  );

command
  .command('init')
  .description(
    'Scaffold Dubs Auth config, env template, and Next route handlers',
  )
  .action(async (_, cmd: Command) => {
    await copyTemplateSet(
      'init',
      'init',
      cmd.optsWithGlobals() as CommandOptions,
    );
  });

const generateCommand = command
  .command('generate')
  .description('Generate local ownership files for host apps');

generateCommand
  .command('schema')
  .description('Generate Drizzle schema and starter SQL migration')
  .action(async (_, cmd: Command) => {
    await copyTemplateSet(
      'schema',
      'generate schema',
      cmd.optsWithGlobals() as CommandOptions,
    );
  });

const addCommand = command
  .command('add')
  .description('Add optional code bundles');

addCommand
  .command('ui')
  .description(
    'Copy source-editable auth and billing UI components into the app',
  )
  .action(async (_, cmd: Command) => {
    await copyTemplateSet(
      'ui',
      'add ui',
      cmd.optsWithGlobals() as CommandOptions,
    );
  });

addCommand
  .command('hooks')
  .description('Copy source-editable auth and billing hooks into the app')
  .action(async (_, cmd: Command) => {
    await copyTemplateSet(
      'hooks',
      'add hooks',
      cmd.optsWithGlobals() as CommandOptions,
    );
  });

command.parseAsync(process.argv).catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[dubs-auth] ${message}`);
  process.exit(1);
});
