# AGENTS.md

Repository guidance for AI/code agents working in `dubs-auth`.

## Mission

Maintain `@wiseiodev/dubs-auth` as a TypeScript library + CLI for Better Auth + Stripe + Drizzle integrations in Next.js App Router apps.

## Non-Negotiables

- Do not run git mutation commands (`git add`, `git commit`, `git push`, etc.) unless the user explicitly asks.
- Do not edit generated build output in `dist/`; change sources under `src/`, `templates/`, `tests/`, or `scripts/` instead.
- Keep changes focused and minimal; avoid broad refactors unless required for the task.

## Stack + Tooling

- Runtime: Node `24+` (`.nvmrc` and `engines.node`).
- Package manager: `pnpm@10.31.0`.
- Language/build: TypeScript (`strict`), `tsup` for library + CLI bundles.
- Lint/format: Biome (`biome.json`, single quotes, semicolons, 2-space indent).
- Tests: Vitest with separate unit, integration, and browser UI configs.

## Repository Map

- `src/index.ts`: Public API barrel. Keep exports in sync with any new public modules.
- `src/auth.ts`: `createDubsAuth` core composition (Better Auth + Stripe plugin + org settings).
- `src/next.ts`: Next.js route handler factories (`createAuthRouteHandlers`, `createBillingRouteHandlers`).
- `src/subscription.ts`: Stripe subscription event normalization and idempotent upsert helpers.
- `src/plans.ts`: plan lookup and Stripe plan conversion helpers.
- `src/cli/*`: `dubs-auth` CLI commands + file copy behavior.
- `templates/*`: scaffold source for `init`, `generate schema`, `add ui`, and `add hooks`.
- `tests/unit`, `tests/integration`, `tests/ui`, `tests/cli`: test suites aligned to module boundaries.
- `scripts/*`: publish/build helper scripts.

## Working Rules

- Use `node:` imports for Node built-ins (repo convention).
- Preserve existing API shapes unless the task explicitly requires a breaking change.
- If you add/change behavior in `src/cli` or `templates`, verify with CLI integration tests.
- If you change subscription/plan logic, update relevant unit/integration tests.
- If you change React components/hooks, run UI tests.
- Keep docs and command examples aligned with actual CLI behavior.

## Verification Commands

Run targeted checks first, then broader checks as needed:

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:ui
pnpm build
```

Full prepublish gate:

```bash
pnpm prepublishOnly
```

## Agent Workflow Notes

- Prefer `rg`/`rg --files` for search.
- Prefer narrow, task-focused edits and include tests for behavior changes.
- Before claiming completion, run the relevant verification command(s) and report the actual result.
