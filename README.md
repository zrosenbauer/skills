# skills

> Personal monorepo for [agent skills](https://skills.sh) — authored, forked, and customized for my own workflows. Works with any agent that supports the `SKILL.md` format (Claude Code, Cursor, Codex, custom agents, etc.).

[![skills.sh](https://skills.sh/b/zrosenbauer/skills)](https://skills.sh/zrosenbauer/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-10-orange?logo=pnpm)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/turborepo-2-blue?logo=turborepo)](https://turborepo.com/)

## About

A pnpm + Turborepo workspace for building, modifying, and publishing [agent skills](https://skills.sh). Skills are markdown files (`SKILL.md`) with frontmatter that describe when and how an agent should invoke them — agent-agnostic by design. This repo also has room for shared utility packages that support skill authoring.

## Structure

```
.
├── skills/              # one directory per skill (SKILL.md + assets)
├── packages/            # shared utility packages (@zrosenbauer/*)
├── AGENTS.md            # agent guidance (CLAUDE.md → symlink)
├── package.json         # root workspace
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting started

**Prerequisites:** Node ≥ 20, pnpm ≥ 10.

```bash
git clone https://github.com/zrosenbauer/skills.git
cd skills
pnpm install
```

## Authoring a skill

Create a new directory under `skills/` and add a `SKILL.md`:

```bash
mkdir -p skills/my-skill
$EDITOR skills/my-skill/SKILL.md
```

`SKILL.md` format:

```markdown
---
description: >-
  When this skill should fire. Include common trigger phrases the user
  might say so the dispatcher matches reliably.
argument-hint: '[<optional-arg>]'
user-invocable: true
model-invocable: true
---

# my-skill

Instructions for the agent when this skill is invoked.
```

See [skills.sh](https://skills.sh) for the full skill spec.

### Installing a skill

Via the [skills.sh](https://skills.sh) CLI (recommended):

```bash
npx skills add zrosenbauer/skills
```

Or symlink directly into your agent's skills directory:

```bash
# Claude Code
ln -s "$PWD/skills/my-skill" ~/.claude/skills/my-skill

# Cursor / other agents — wherever that agent loads skills from
ln -s "$PWD/skills/my-skill" <agent-skills-dir>/my-skill
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
