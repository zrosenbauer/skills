---
name: audit-registries
description: >-
  This skill should be used when the user wants to verify the registries in
  this monorepo are still up-to-date with their upstream sources — provider
  doc URLs, AI CLI binaries, npm dep versions, and the skills.sh agents list.
  Common triggers include "audit registries", "are we up to date", "check
  for stale providers", "any drift in our skills tools", "refresh the cli
  registry", and "verify provider docs". Reports per-entry status (fresh /
  stale / gone / new / errored), then asks whether to apply auto-fixes,
  review per-category, or just save the report. Skip when authoring a new
  skill (use skill-creator) or running skill baselines (use skill-eval).

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[--only <category>|--offline]'
user-invocable: true
model-invocable: true

# --- skills CLI ---
metadata:
  internal: true
---

# audit-registries

Verifies the registries in this repo against their upstream sources. Catches drift before it silently rots a skill or a CLI invocation.

Four audit categories — each can be run independently with `--only <name>`:

| Category | What it checks |
|---|---|
| `provider-docs` | HEAD each `docUrl` in `skills/skill-portability/scripts/providers.mjs` |
| `cli-binaries` | Locate each `binary` in `skills/code-reviewer/scripts/cli-registry.mjs` on `$PATH` |
| `deps-versions` | `npm view` each dep + devDep in `packages/skill-tools/package.json`; flag major drift |
| `skills-sh-diff` | Fetch `vercel-labs/skills/src/agents.ts`; diff IDs against `cli-registry.mjs` |

## When to use

Verbatim trigger phrases:

- "audit registries"
- "are we up to date"
- "check for stale providers"
- "any drift in our skills tools"
- "refresh the cli registry"
- "verify provider docs"
- "is anything stale"

## When NOT to use

- Authoring a new skill — use `/skill-creator`
- Running skill baselines after a model upgrade — use `/skill-eval`
- Linting skill quality — use `pnpm skill-tools lint`
- Updating npm deps directly without auditing — just `pnpm update` (this skill is for *finding* drift, then deciding what to do)

## Inputs

`$ARGUMENTS` — optional flags passed to `scripts/audit.mjs`:

- `--only <category>` — run one of `provider-docs`, `cli-binaries`, `deps-versions`, `skills-sh-diff`
- `--offline` — skip network-dependent categories (provider-docs, deps-versions, skills-sh-diff still need net for full results)
- `--timeout <s>` — per-request timeout (default 8s)

Default behavior (no args): run all four categories.

## Workflow

### 1. Run the audit

```bash
node scripts/audit.mjs --pretty
```

Output is structured JSON. The script never throws and never exits non-zero — staleness is data, not failure. If the network is unreachable, network-dependent categories return `errored` entries; the rest still run.

### 2. Parse the report

The output has this shape:

```json
{
  "auditedAt": "2026-05-07T...",
  "summary": { "fresh": 35, "stale": 3, "gone": 1, "new": 2, "errored": 0 },
  "categories": [
    { "name": "provider-docs", "entries": [...] },
    { "name": "cli-binaries",  "entries": [...] },
    { "name": "deps-versions", "entries": [...] },
    { "name": "skills-sh-diff","entries": [...] }
  ]
}
```

Each entry has: `id`, `status`, `details[]`, `autoFixable`, optional `fix` hint.

`status` values:

- `fresh` — verified up-to-date
- `stale` — entry exists but a doc URL / binary / version is out-of-date
- `gone` — entry exists locally but upstream is missing (CLI uninstalled, URL 404'd)
- `new` — exists upstream but not in our local registry — candidate for adding
- `errored` — couldn't determine (network failure, parse error)

### 3. Present the summary to the user

Show a one-line summary plus a per-category breakdown. Group by `status` within each category. Quote `details[0]` for each finding so the cause is visible.

### 4. Ask the user what to do

Use `AskUserQuestion` (Claude Code) or your agent's equivalent. Three options:

1. **Auto-fix all auto-fixable items** — apply patches for entries with `autoFixable: true` (currently: dep version bumps via `pnpm update`)
2. **Review per category** — drill into one category, show every finding, ask per-finding whether to apply / skip / open the doc
3. **Save report only** — write the JSON to `audit-report-<timestamp>.json` in the cwd; user decides later

### 5. Apply fixes (if chosen)

For `autoFixable: true` entries, run the `fix` command via Bash. After each fix, re-run the relevant audit category to confirm.

For `autoFixable: false` entries, the `fix` field describes what to do but requires human judgment — present the suggestion and let the user say what to apply. Common cases:

- **Stale provider docUrl** — agent fetches the new canonical URL via WebFetch, replaces it in `providers.mjs` via Edit
- **Gone CLI binary** — agent confirms with user before removing the entry from `cli-registry.mjs`
- **New skills.sh agent** — agent looks up the docs, asks user whether to add to `cli-registry.mjs`

See [`references/what-can-be-autofixed.md`](references/what-can-be-autofixed.md) for the full breakdown.

## Examples

<example>
<input>"are we up to date"</input>
<output>
1. Run `node scripts/audit.mjs --pretty` — full audit, all 4 categories.
2. Output: 35 fresh, 3 stale, 1 gone, 2 new, 0 errored.
3. Show user:

   PROVIDER DOCS:    cursor [stale] — cursor.com/docs/context/rules-for-ai 404
   CLI BINARIES:     gemini-cli [gone] — gemini not on $PATH (15 others fresh)
   DEPS VERSIONS:    @kidd-cli/core [stale] — installed 0.23.1, latest 0.24.0
                     ink [stale] — installed 7.0.2, latest 7.1.0
                     oxlint [stale] — installed 1.63.0, latest 1.65.0
   SKILLS-SH DIFF:   2 new agents upstream (`hermes-agent`, `pochi`)

4. AskUserQuestion: auto-fix all (3 dep bumps), review per-category, or save report?
5. User picks "auto-fix all" → run `pnpm --filter @zrosenbauer/skill-tools update <pkg>@latest` for each dep.
6. Stale URL + new agents need human review — present those separately.
</output>
</example>

<example>
<good>
Reported the full picture (4 categories) before asking any question.
Quoted the failing URL verbatim ("cursor.com/docs/context/rules-for-ai 404")
so the user can see what changed without re-running anything.
</good>

<bad>
"Some things might be out of date. Want me to update them?"
</bad>

The bad version is the failure mode this skill is designed to prevent — a vague status report wastes the user's attention and forces them to ask follow-up questions to learn anything actionable.

## References

- [`references/audit-workflow.md`](references/audit-workflow.md) — detailed run-through of each category
- [`references/what-can-be-autofixed.md`](references/what-can-be-autofixed.md) — auto-fixable rules vs. human-review rules
- [`references/extending-the-audit.md`](references/extending-the-audit.md) — how to add a new audit category
- [`scripts/audit.mjs`](scripts/audit.mjs) — the runner
- [`scripts/audit.test.mjs`](scripts/audit.test.mjs) — tests (run via `pnpm test:scripts`)
