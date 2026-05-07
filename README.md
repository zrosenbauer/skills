# skills

> Personal monorepo for [agent skills](https://skills.sh) — authored, forked, and customized for my own workflows. Works with any agent that supports the `SKILL.md` format (Claude Code, Cursor, Codex, custom agents, etc.).

[![skills.sh](https://skills.sh/b/zrosenbauer/skills)](https://skills.sh/zrosenbauer/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## About

A pnpm + Turborepo workspace for building, modifying, and publishing [agent skills](https://skills.sh). Skills are markdown files (`SKILL.md`) with frontmatter that describe when and how an agent should invoke them — agent-agnostic by design. This repo also has room for shared utility packages that support skill authoring.

## Structure

```
.
├── skills/              # public skills — published via the skills CLI
├── .agents/skills/      # private/local skills (not published)
├── packages/            # shared utility packages (@zrosenbauer/*)
├── .claude/skills/      # symlinks into .agents/skills/ for Claude Code to load
├── AGENTS.md            # agent guidance (CLAUDE.md → symlink)
├── package.json         # root workspace
├── pnpm-workspace.yaml
└── turbo.json
```

`skills/` and `.agents/skills/` use the same `SKILL.md` format. The split is about distribution, not content:

| Location | Visibility | Distribution |
|---|---|---|
| `skills/<name>/` | Public | Listed and installed by `npx skills add zrosenbauer/skills` |
| `.agents/skills/<name>/` | Local-only | Not listed by the CLI; loaded by symlinking into `.claude/skills/` (or your agent's equivalent) |

## Getting started

**Prerequisites:** Node ≥ 20, pnpm ≥ 10.

```bash
git clone https://github.com/zrosenbauer/skills.git
cd skills
pnpm install
```

## Authoring a skill

For public skills — anyone can install via `npx skills add`:

```bash
mkdir -p skills/my-skill
$EDITOR skills/my-skill/SKILL.md
```

For local-only skills — only available to you, in this repo:

```bash
mkdir -p .agents/skills/my-skill
$EDITOR .agents/skills/my-skill/SKILL.md
ln -s "../../.agents/skills/my-skill" .claude/skills/my-skill   # for Claude Code
```

`SKILL.md` format:

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

### Pressure-tested skills

Public skills in this repo ship an `evals.json` alongside `SKILL.md` — at least 3 realistic pressure scenarios with deterministic assertions. The runner skill `/skill-eval` dispatches subagents to re-run them after Claude version upgrades, and `pnpm skill-tools benchmark <name>` aggregates the results. Transcripts and grading live in a gitignored sibling `<name>-workspace/`.

Skill authoring is best done through `/skill-creator`, which walks the RED→GREEN→REFACTOR cycle and enforces the lint rules.

```bash
pnpm skill-tools lint              # all skills (three-tier severity)
pnpm skill-tools lint <name>       # one skill
pnpm skill-tools view              # TUI: browse skills, iterations, transcripts
pnpm skill-tools benchmark <name>  # aggregate to benchmark.md
```

### Installing a public skill

Via the [skills.sh](https://skills.sh) CLI:

```bash
npx skills add zrosenbauer/skills              # all public skills
npx skills add zrosenbauer/skills --skill ts-best-practices   # one specific
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm install` | Install workspace dependencies |
| `pnpm build` | Run `build` across workspace packages |
| `pnpm lint` | Run `lint` across workspace packages |
| `pnpm typecheck` | Run `typecheck` across workspace packages |
| `pnpm test` | Run `test` across workspace packages |
| `pnpm clean` | Clean build output and `node_modules` |

All `pnpm <task>` scripts are thin wrappers around `turbo run <task>`.

## Adding a shared package

```bash
mkdir -p packages/utils
cd packages/utils
pnpm init
# set "name": "@zrosenbauer/utils"
```

`pnpm-workspace.yaml` already includes `packages/*`, so it'll be picked up automatically.

## Conventions

- Skill directory names are `kebab-case`.
- Shared packages are scoped `@zrosenbauer/<name>`.
- Edit `AGENTS.md`, never `CLAUDE.md` (symlink).
- Forked third-party skills keep their upstream `LICENSE` alongside.

## License

[MIT](./LICENSE) © Zac Rosenbauer
