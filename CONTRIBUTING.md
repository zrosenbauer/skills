# Contributing

Thanks for your interest in this repo. It's a personal monorepo, but issues and PRs are welcome — especially bug reports for published skills, eval contributions, and portability fixes.

## Prerequisites

- **Node** ≥ 20
- **pnpm** ≥ 10 (the version is pinned via `packageManager` in the root `package.json`)

```bash
git clone https://github.com/zrosenbauer/skills.git
cd skills
pnpm install
```

## Project layout

```
.
├── skills/              # AUTHORING SOURCE — skills authored here, published via `npx skills add`
│   └── <name>/
│       ├── SKILL.md     # the skill itself
│       ├── skill.json   # optional manifest — declares which shared scripts to vendor in
│       ├── scripts/     # skill-local scripts + vendored shared script dirs
│       ├── LICENSE
│       └── README.md
├── .agents/skills/      # INSTALL DESTINATION managed by `npx skills add` — DO NOT hand-edit
├── skill-scripts/       # canonical source for shared scripts (e.g. prompt-shield)
│   └── <name>/          # vendored into `<skill>/scripts/<name>/` via `pnpm skill-toolkit sync`
├── packages/
│   └── skill-toolkit/     # CLI for linting skills
├── contributing/        # supplementary contributor docs (e.g. prompt-injection.md)
├── lefthook.yml         # pre-commit hooks (sync, format, lint, drift check)
├── package.json         # root, private, workspaces via pnpm-workspace.yaml
├── pnpm-workspace.yaml
├── turbo.json
└── AGENTS.md            # agent guidance (CLAUDE.md is a symlink to this)
```

### Authoring vs. install destinations

`skills/` is the **authoring source** — what you edit and publish. `.agents/skills/` is the **install destination** managed by `npx skills add` and tracked in `skills-lock.json`. The same skill can appear in both paths (when you dogfood your own skill by installing it locally) — these are NOT duplicates and `.agents/skills/` should never be hand-edited or `rm`'d. Use the skills CLI to refresh installed copies.

All skills under `skills/` are publicly distributed by design — every skill ships through `npx skills add` and gets audited by skills.sh. There are no local-only / internal skills in this repo.

### Sharing scripts between skills

When more than one skill needs the same helper (e.g. `prompt-shield` for indirect-prompt-injection mitigation), the canonical source goes in `skill-scripts/<name>/`. Each consuming skill declares it in `skill.json`:

```json
{ "scripts": ["prompt-shield"] }
```

Then `pnpm skill-toolkit sync` vendors a byte-identical copy into the skill's `scripts/<name>/` directory. Vendored copies are committed so skills stay self-contained when shipped via `npx skills add`. Do not hand-edit vendored copies — Lefthook's pre-commit drift check (`pnpm skill-toolkit sync --check`) will fail. See [`contributing/prompt-injection.md`](./contributing/prompt-injection.md) for the prompt-shield example.

## Authoring a skill

The supported path is `/skill-creator` — it enforces naming and description rules and runs the self-lint.

```bash
# In Claude Code (or any agent that loads this repo's skills):
/skill-creator my-skill
```

If you'd rather hand-author, the minimum setup is:

```bash
mkdir -p skills/my-skill
$EDITOR skills/my-skill/SKILL.md
```

Hand-authored skills must still pass `pnpm skill-toolkit lint --severity error`.

### `SKILL.md` format

```markdown
---
name: my-skill
description: >-
  When this skill should fire. Include common trigger phrases the user
  might say so the dispatcher matches reliably.

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<optional-arg>]'
user-invocable: true
model-invocable: true
---

# my-skill

Instructions for the agent when this skill is invoked.
```

`name` and `description` are the universal core (required by the [`skills` CLI](https://www.npmjs.com/package/skills)). The other fields are Claude Code extensions — other agents ignore them. See [skills.sh](https://skills.sh) for the full spec.

## Scripts

All `pnpm <task>` scripts are thin wrappers around `turbo run <task>`.

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `pnpm install`   | Install workspace dependencies            |
| `pnpm build`     | Run `build` across workspace packages     |
| `pnpm lint`      | Run `lint` across workspace packages      |
| `pnpm typecheck` | Run `typecheck` across workspace packages |
| `pnpm test`      | Run `test` across workspace packages      |
| `pnpm clean`     | Clean build output and `node_modules`     |

Skill-specific tooling:

```bash
pnpm skill-toolkit lint                      # lint every skill (three-tier severity)
pnpm skill-toolkit lint <name>               # lint one skill
pnpm skill-toolkit sync              # vendor canonical scripts into each consuming skill
pnpm skill-toolkit sync --check      # fail if any vendored copy drifts from source
pnpm audit:skills                          # run snyk-agent-scan on public skills (needs SNYK_TOKEN)
```

### Refreshing provider doc snapshots

`skill-portability` audits skills against bundled provider doc snapshots committed under `skills/skill-portability/references/providers/<id>.md`. The skill never fetches at agent runtime — that keeps audits deterministic, offline-capable, and out of W011/W012 trigger range.

Refresh cadence is quarterly+. Update by hand: open `docUrls` in `skills/skill-portability/scripts/providers.mjs`, fetch the page (`curl <url>` or your browser's reader view), strip to plain text, and overwrite the corresponding `skills/skill-portability/references/providers/<id>.md` file. Run `node skills/skill-portability/scripts/providers.mjs --check` to HEAD upstream URLs and catch 404s before refreshing.

The snapshots are committed alongside the skill — that's intentional.

### Pre-commit hooks

[Lefthook](https://lefthook.dev) is wired up via the `prepare` script — `pnpm install` runs `lefthook install` automatically. The `pre-commit` hook (defined in `lefthook.yml`):

1. Runs `sync` if anything under `skill-scripts/**` is staged, then re-stages the vendored copies.
2. Auto-formats staged files with `oxfmt` and re-stages.
3. Lints staged JS/TS with `oxlint`.
4. Runs `skill-toolkit lint --severity error` if any skill or skill-script source is staged.
5. Always runs `sync --check` to catch hand-edits to vendored copies.

Skip ad-hoc with `LEFTHOOK=0 git commit ...`. Avoid `--no-verify` outside of emergencies.

## Adding a shared package

```bash
mkdir -p packages/utils
cd packages/utils
pnpm init
# set "name": "@zrosenbauer/utils"
```

`pnpm-workspace.yaml` already includes `packages/*`, so the package is picked up automatically.

## Conventions

- Skill directory names are `kebab-case`.
- Shared packages are scoped `@zrosenbauer/<name>`.
- Edit `AGENTS.md`, never `CLAUDE.md` (it's a symlink).
- Forked third-party skills keep their upstream `LICENSE` alongside.
- Don't add a `package.json` to a skill directory unless it actually needs JS deps — most skills are pure markdown.
- Prefer editing existing skills over forking. If forking from a third-party skill, keep the upstream `LICENSE`.

## Submitting changes

1. Fork and branch.
2. Run `pnpm skill-toolkit lint --severity error` and `pnpm test` before pushing.
3. Open a PR describing the change and the failure mode it addresses.
