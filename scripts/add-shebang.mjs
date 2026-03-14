import { chmod, readFile, writeFile } from 'node:fs/promises';

const target = process.argv[2];

if (!target) {
  throw new Error('Missing target file path for shebang insertion.');
}

const shebang = '#!/usr/bin/env node';
const content = await readFile(target, 'utf8');

if (!content.startsWith(shebang)) {
  await writeFile(target, `${shebang}\n${content}`, 'utf8');
}

await chmod(target, 0o755);
