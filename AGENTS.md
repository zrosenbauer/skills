# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex, etc.) working in this repo.

## What this repo is

A personal monorepo for [Claude Skills](https://skills.sh) authored by Zac Rosenbauer. Skills live in `skills/<skill-name>/` and follow the `SKILL.md` format. Shared utilities (if any) live as pnpm workspace packages in `packages/`.

## Layout

```
.
├── skills/              # one directory per skill, each with a SKILL.md
├── packages/            # pnpm workspace packages (shared utils)
├── package.json         # root, private, workspaces via pnpm-workspace.yaml
├── pnpm-workspace.yaml  # workspace globs
├── turbo.json           # turbo task pipeline
└── AGENTS.md            # ← you are here (CLAUDE.md is a symlink to this file)
```

## Skill format

Each skill is a directory under `skills/` with at minimum a `SKILL.md`:

```markdown
---
description: >-
  One paragraph describing when this skill should be used. Include common
  triggers (verbatim phrases the user might say) so the dispatcher can match.
argument-hint: '[<optional-arg>]'
user-invocable: true
model-invocable: true
---

# <skill-name>

Body of the skill — instructions for the model when invoked.
```

Optional files inside a skill: `LICENSE`, `README.md`, supporting scripts/templates.

## Tooling

- **pnpm** for installs (`packageManager` is pinned in root `package.json`)
- **turbo** for running tasks across workspace packages
- **Node ≥ 20**

Common commands:

```bash
pnpm install           # install all workspace deps
pnpm build             # turbo run build
pnpm lint              # turbo run lint
pnpm typecheck         # turbo run typecheck
pnpm test              # turbo run test
```

## Conventions for agents

- **Never edit `CLAUDE.md` directly** — it's a symlink to `AGENTS.md`. Edit `AGENTS.md`.
- New skills go in `skills/<kebab-case-name>/SKILL.md`. Don't drop them at the repo root.
- Shared utilities go in `packages/<name>/` with their own `package.json` and follow the workspace name convention `@zrosenbauer/<name>`.
- Don't add a `package.json` to a skill directory unless it actually needs JS deps — most skills are pure markdown.
- Prefer editing existing skills over forking. If forking from a third-party skill, keep the upstream `LICENSE` alongside it.
