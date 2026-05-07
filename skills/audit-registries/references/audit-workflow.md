# Audit workflow

Detailed walk-through of what each category checks, how it's verified, and what the failure modes look like.

## Category 1 — `provider-docs`

**Source:** `skills/skill-portability/scripts/providers.mjs`

**What it does:** for each provider entry, HEAD every URL in `docUrls`. If the server rejects HEAD (405 / 501), retry as GET. Treat any 2xx as fresh.

**Status mapping:**

- `fresh` — every URL returns 2xx
- `stale` — at least one URL returns 2xx, but at least one fails. The provider isn't gone, but a specific doc has moved.
- `gone` — every URL fails. The whole provider's docs are unreachable; the entry needs investigation or removal.
- `errored` — entry has no `docUrls` declared

**What the agent should do:**

- Stale: WebFetch the failing URL's host root, find the new canonical doc URL, propose the replacement
- Gone: confirm with user that the provider is genuinely gone (or rebranded) before removing the entry
- Errored: add `docUrls` to the entry — every provider entry should have at least one canonical doc URL

## Category 2 — `cli-binaries`

**Source:** `skills/code-reviewer/scripts/cli-registry.mjs`

**What it does:** for each registry entry, walk `$PATH` for the `binary` name. No version probe — just presence.

**Status mapping:**

- `fresh` — binary exists on `$PATH` (path printed in `details`)
- `gone` — binary not found on `$PATH`

**What the agent should do:**

- Gone: this is informational, not an error — the user might genuinely not have that CLI installed. Don't remove entries solely because they're not on this machine. Only remove if the user explicitly confirms the CLI is abandoned upstream.
- For an actively-supported CLI that the user wants to add: install it manually (`brew install <name>`, `npm i -g <pkg>`, etc.), then re-run the audit.

## Category 3 — `deps-versions`

**Source:** `packages/skill-tools/package.json`

**What it does:** for each `dependencies` and `devDependencies` entry, fetch `https://registry.npmjs.org/<pkg>/latest` and compare the `version` field with the installed range from `package.json`. Major-version drift is flagged; same-major minor / patch drift is treated as fresh.

**Status mapping:**

- `fresh` — major versions match
- `stale` — installed major < latest major (`autoFixable: true`, `fix` populated with `pnpm update` command)
- `errored` — npm registry unreachable or returned a non-2xx

**What the agent should do:**

- Stale: run the `fix` command verbatim (`pnpm --filter @zrosenbauer/skill-tools update <name>@latest`). Re-run typecheck + tests after updates to catch breakage.
- Errored: usually transient; retry with longer `--timeout`. Persistent errors mean the registry URL changed (rare).

## Category 4 — `skills-sh-diff`

**Source:**
- Local: `skills/code-reviewer/scripts/cli-registry.mjs` IDs
- Upstream: `https://raw.githubusercontent.com/vercel-labs/skills/main/src/agents.ts` (parsed for `name: 'foo'` literals)

**What it does:** fetches the upstream agents.ts, extracts every agent ID, and computes the symmetric difference with our local IDs.

**Status mapping:**

- `new` — upstream has it, we don't (candidate for adding)
- `stale` — we have it, upstream doesn't (candidate for removing)

**What the agent should do:**

- New: don't auto-add. Look up the new agent's docs, verify it has a CLI (per the "MUST be CLI-based" rule), then propose adding to `cli-registry.mjs` with full `promptTemplate` / `stdinTemplate` / `notes`.
- Stale: don't auto-remove. The agent might still work even if vercel-labs dropped it. Confirm with the user before removing.

## What "fresh" doesn't promise

The audit's `fresh` status means the surface check passed. It does NOT guarantee:

- That the doc page's *content* is current (only that the URL still resolves)
- That a CLI binary on `$PATH` is the version we expect (no version diff against registry)
- That a dep's same-major version doesn't have breaking changes (semver is a convention, not a contract)

For those deeper checks, dispatch a subagent (`Agent` tool) to read the doc and diff against our entry's `requiredFrontmatter` / `forbiddenFrontmatter` / `toolSurface`. That's not built into `audit.mjs` — it's a Step 2 the orchestrating agent can choose to run when a finding warrants it.
