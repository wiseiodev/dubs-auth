# CLI Reference

The package ships a `dubs-auth` CLI for scaffolding and copying integration
templates.

## Usage modes

- Consumer app (package installed): `pnpm exec dubs-auth ...`
- Repository development (source): `node --import tsx src/cli/index.ts ...`
- Repository development (built): `node dist/cli/index.js ...` after
  `pnpm build:cli`

## Help

```bash
pnpm exec dubs-auth --help
pnpm exec dubs-auth help init
pnpm exec dubs-auth add --help
```

## Global flags

- `--cwd <path>`: target application path (default `.`)
- `--dry-run`: preview files that would be written
- `--force`: overwrite existing files even when changed

## Commands

### `init`

Scaffolds:

- `.env.dubs-auth.example`
- `dubs-auth.config.ts`
- `src/lib/dubs-auth.ts`
- route handlers under `src/app/api`

```bash
pnpm exec dubs-auth init
pnpm exec dubs-auth init --cwd ../my-app --dry-run
```

### `generate schema`

Scaffolds local schema ownership files:

- `src/db/dubs-auth-schema.ts`
- `drizzle/0001_dubs_auth.sql`

```bash
pnpm exec dubs-auth generate schema
```

### `add ui`

Copies source-editable UI components to your app.

```bash
pnpm exec dubs-auth add ui
```

### `add hooks`

Copies source-editable hooks to your app.

```bash
pnpm exec dubs-auth add hooks
```
