import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface CopyContext {
  cwd: string;
  dryRun: boolean;
  force: boolean;
}

const normalizePath = (value: string): string =>
  value.split(path.sep).join('/');

const shouldOverwrite = async (
  destination: string,
  source: string,
  force: boolean,
): Promise<boolean> => {
  if (force) {
    return true;
  }

  try {
    const [sourceContents, destinationContents] = await Promise.all([
      readFile(source, 'utf8'),
      readFile(destination, 'utf8'),
    ]);
    return sourceContents !== destinationContents;
  } catch {
    return true;
  }
};

export const copyDirectory = async (
  sourceDir: string,
  destinationDir: string,
  context: CopyContext,
): Promise<string[]> => {
  const written: string[] = [];

  const visit = async (currentSource: string, currentDestination: string) => {
    const entries = await readdir(currentSource, { withFileTypes: true });

    await mkdir(currentDestination, { recursive: true });

    for (const entry of entries) {
      const sourcePath = path.join(currentSource, entry.name);
      const destinationPath = path.join(currentDestination, entry.name);

      if (entry.isDirectory()) {
        await visit(sourcePath, destinationPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const destinationExists = await stat(destinationPath)
        .then(() => true)
        .catch(() => false);

      if (destinationExists) {
        const overwrite = await shouldOverwrite(
          destinationPath,
          sourcePath,
          context.force,
        );

        if (!overwrite) {
          continue;
        }
      }

      if (!context.dryRun) {
        const content = await readFile(sourcePath, 'utf8');
        await writeFile(destinationPath, content, 'utf8');
      }

      written.push(normalizePath(path.relative(context.cwd, destinationPath)));
    }
  };

  await visit(sourceDir, destinationDir);
  return written.sort();
};
