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
│       ├── evals.json   # ≥3 pressure scenarios + assertions (committed)
│       ├── scripts.json # optional — declares which shared scripts to vendor in
│       ├── scripts/     # skill-local scripts + vendored shared script dirs
│       ├── LICENSE
│       ├── README.md
│       └── .workspace/  # gitignored — transcripts, grading, benchmarks (per skill)
├── .agents/skills/      # INSTALL DESTINATION managed by `npx skills add` — DO NOT hand-edit
├── skill-scripts/       # canonical source for shared scripts (e.g. prompt-shield)
│   └── <name>/          # vendored into `<skill>/scripts/<name>/` via `pnpm skill-tools sync-scripts`
├── packages/
│   └── skill-tools/     # CLI for linting + evaluating skills (kidd + Ink TUI)
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

When more than one skill needs the same helper (e.g. `prompt-shield` for indirect-prompt-injection mitigation), the canonical source goes in `skill-scripts/<name>/`. Each consuming skill declares it in `scripts.json`:

```json
{ "scripts": ["prompt-shield"] }
```

Then `pnpm skill-tools sync-scripts` vendors a byte-identical copy into the skill's `scripts/<name>/` directory. Vendored copies are committed so skills stay self-contained when shipped via `npx skills add`. Do not hand-edit vendored copies — Lefthook's pre-commit drift check (`pnpm skill-tools sync-scripts --check`) will fail. See [`contributing/prompt-injection.md`](./contributing/prompt-injection.md) for the prompt-shield example.

## Authoring a skill

The supported path is `/skill-creator` — it walks the RED → GREEN → REFACTOR cycle, enforces naming and description rules, and writes `evals.json` for you.

```bash
# In Claude Code (or any agent that loads this repo's skills):
/skill-creator my-skill
```

If you'd rather hand-author, the minimum setup is:

```bash
mkdir -p skills/my-skill
$EDITOR skills/my-skill/SKILL.md
$EDITOR skills/my-skill/evals.json   # ≥3 pressure scenarios — required by lint
```

Hand-authored skills must still pass `pnpm skill-tools lint --severity error`.

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

### Evals are required for every skill

Every skill under `skills/` must ship an `evals.json` with at least 3 pressure scenarios and deterministic assertions. The lint blocks publishing otherwise.

References:

- [`evals.json` schema](./skills/skill-creator/references/evals-json.md)
- [Pressure scenarios guide](./skills/skill-creator/references/pressure-scenarios.md)

The runner skill `/skill-eval` re-runs baselines (e.g. after a Claude version upgrade), and `pnpm skill-tools benchmark <name>` aggregates the iteration grading into `benchmark.md`. Transcripts and grading live in a gitignored `<skill>/.workspace/` directory inside each skill.

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
pnpm skill-tools lint                      # lint every skill (three-tier severity)
pnpm skill-tools lint <name>               # lint one skill
pnpm skill-tools view                      # TUI: browse skills, iterations, transcripts
pnpm skill-tools benchmark <name>          # aggregate iteration grading to benchmark.md
pnpm skill-tools sync-scripts              # vendor canonical scripts into each consuming skill
pnpm skill-tools sync-scripts --check      # fail if any vendored copy drifts from source
pnpm audit:skills                          # run snyk-agent-scan on public skills (needs SNYK_TOKEN)
```

### Pre-commit hooks

[Lefthook](https://lefthook.dev) is wired up via the `prepare` script — `pnpm install` runs `lefthook install` automatically. The `pre-commit` hook (defined in `lefthook.yml`):

1. Runs `sync-scripts` if anything under `skill-scripts/**` is staged, then re-stages the vendored copies.
2. Auto-formats staged files with `oxfmt` and re-stages.
3. Lints staged JS/TS with `oxlint`.
4. Runs `skill-tools lint --severity error` if any skill or skill-script source is staged.
5. Always runs `sync-scripts --check` to catch hand-edits to vendored copies.

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
2. Run `pnpm skill-tools lint --severity error` and `pnpm test` before pushing.
3. For new or modified public skills, include an updated `evals.json` and (ideally) a fresh transcript showing GREEN.
4. Open a PR describing the change and the failure mode it addresses.
