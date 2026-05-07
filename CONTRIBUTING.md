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
├── skills/              # public skills — published via `npx skills add`
│   └── <name>/
│       ├── SKILL.md     # the skill itself
│       ├── evals.json   # ≥3 pressure scenarios + assertions (committed)
│       ├── LICENSE
│       └── README.md
├── <name>-workspace/    # gitignored sibling — transcripts, grading, benchmarks
├── .agents/skills/      # optional local-only skills (currently empty)
├── packages/
│   └── skill-tools/     # CLI for linting + evaluating skills (kidd + Ink TUI)
├── package.json         # root, private, workspaces via pnpm-workspace.yaml
├── pnpm-workspace.yaml
├── turbo.json
└── AGENTS.md            # agent guidance (CLAUDE.md is a symlink to this)
```

### Public vs. local-only skills

Both use the same `SKILL.md` format — the location decides distribution.

| Location | Visibility | Distribution |
| --- | --- | --- |
| `skills/<name>/` | Public | Listed and installed by `npx skills add zrosenbauer/skills` |
| `.agents/skills/<name>/` | Local-only | Hidden from the CLI when marked `metadata.internal: true`; load via your agent's load path |

## Authoring a skill

The supported path is `/skill-creator` — it walks the RED → GREEN → REFACTOR cycle, enforces naming and description rules, and writes `evals.json` for you.

```bash
# In Claude Code (or any agent that loads this repo's skills):
/skill-creator my-skill
```

If you'd rather hand-author, the minimum setup is:

```bash
# Public skill
mkdir -p skills/my-skill
$EDITOR skills/my-skill/SKILL.md

# Local-only skill (hidden from the CLI)
mkdir -p .agents/skills/my-skill
$EDITOR .agents/skills/my-skill/SKILL.md
# Add `metadata: { internal: true }` to the frontmatter.
```

Either way, hand-authored skills must still pass `pnpm skill-tools lint --severity error`.

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

### Evals are required for public skills

Every skill under `skills/` must ship an `evals.json` with at least 3 pressure scenarios and deterministic assertions. The lint blocks publishing otherwise. Internal skills (`metadata.internal: true`) are exempt.

References:

- [`evals.json` schema](./skills/skill-creator/references/evals-json.md)
- [Pressure scenarios guide](./skills/skill-creator/references/pressure-scenarios.md)

The runner skill `/skill-eval` re-runs baselines (e.g. after a Claude version upgrade), and `pnpm skill-tools benchmark <name>` aggregates the iteration grading into `benchmark.md`. Transcripts and grading live in a gitignored sibling `<name>-workspace/`.

## Scripts

All `pnpm <task>` scripts are thin wrappers around `turbo run <task>`.

| Command | Description |
| --- | --- |
| `pnpm install` | Install workspace dependencies |
| `pnpm build` | Run `build` across workspace packages |
| `pnpm lint` | Run `lint` across workspace packages |
| `pnpm typecheck` | Run `typecheck` across workspace packages |
| `pnpm test` | Run `test` across workspace packages |
| `pnpm clean` | Clean build output and `node_modules` |

Skill-specific tooling:

```bash
pnpm skill-tools lint              # lint every skill (three-tier severity)
pnpm skill-tools lint <name>       # lint one skill
pnpm skill-tools view              # TUI: browse skills, iterations, transcripts
pnpm skill-tools benchmark <name>  # aggregate iteration grading to benchmark.md
```

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
