# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex, etc.) working in this repo.

## What this repo is

A personal monorepo for [agent skills](https://skills.sh) authored by Zac Rosenbauer. Skills are agent-agnostic — they target the `SKILL.md` format and work with any agent that loads it (Claude Code, Cursor, Codex, custom agents, etc.). Skills live in `skills/<skill-name>/`. Shared utilities (if any) live as pnpm workspace packages in `packages/`.

## Layout

```
.
├── skills/              # PUBLIC skills — published via `npx skills add`
│   └── <name>/
│       ├── SKILL.md     # the skill
│       ├── evals.json   # ≥3 pressure scenarios + assertions (committed)
│       ├── LICENSE
│       ├── README.md
│       └── .workspace/  # GITIGNORED — transcripts, grading, benchmarks (per skill)
├── .agents/skills/      # OPTIONAL local-only skills — not published (currently empty)
├── packages/
│   └── skill-tools/     # CLI for linting + evaluating skills (kidd + Ink TUI)
├── package.json         # root, private, workspaces via pnpm-workspace.yaml
├── pnpm-workspace.yaml  # workspace globs
├── turbo.json           # turbo task pipeline
└── AGENTS.md            # ← you are here (CLAUDE.md is a symlink to this file)
```

**Public vs. private skills:** both use the same `SKILL.md` format; the location decides distribution.

- `skills/<name>/` is published. Anyone can install with `npx skills add zrosenbauer/skills`. Claude Code in this project also loads from here directly — no symlink needed.
- `.agents/skills/<name>/` is reserved for future local-only skills. Currently empty. If used, mark with `metadata.internal: true` so the skills CLI hides it and lint exempts it from the eval-required rule.

## Skill format

Each skill is a directory under `skills/` (or `.agents/skills/` for local-only skills) with at minimum:

```markdown
---
name: <skill-name>
description: >-
  One paragraph describing when this skill should be used. Include common
  triggers (verbatim phrases the user might say) so the dispatcher can match.

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<optional-arg>]'
user-invocable: true
model-invocable: true
---

# <skill-name>

Body of the skill — instructions for the agent when invoked.
```

`name` and `description` are universally required. Other fields are Claude Code extensions; cross-agent skills include them defensively (other agents ignore unknown fields).

Public skills MUST also ship an `evals.json` (≥ 3 pressure scenarios + assertions). The lint blocks shipping otherwise. Internal skills (`metadata.internal: true`) are exempt. See [`evals.json` schema](skills/skill-creator/references/evals-json.md) and [pressure scenarios guide](skills/skill-creator/references/pressure-scenarios.md).

Optional companions: `LICENSE`, `README.md`, `references/<topic>.md`, `templates/<thing>.template`.

## Tooling

- **pnpm** for installs (`packageManager` is pinned in root `package.json`)
- **turbo** for running tasks across workspace packages
- **Node ≥ 20**

Common commands:

```bash
pnpm install                       # install all workspace deps
pnpm build                         # turbo run build (compiles skill-tools via kidd)
pnpm lint                          # turbo run lint
pnpm typecheck                     # turbo run typecheck
pnpm test                          # turbo run test
pnpm skill-tools lint              # lint every skill against the three-tier rule set
pnpm skill-tools lint <name>       # lint one skill
pnpm skill-tools view              # TUI: browse skills / iterations / transcripts
pnpm skill-tools benchmark <name>  # aggregate iteration grading into benchmark.md
```

Authoring and evaluating skills:

- **`/skill-creator <name>`** — author a new skill (interactive workflow: pressure scenarios → RED baselines → SKILL.md → GREEN re-run → lint → package)
- **`/skill-eval <name>`** or `/skill-eval --all` — re-run baselines on existing skills (after a Claude version upgrade, before publishing, etc.)

## Conventions for agents

- **Never edit `CLAUDE.md` directly** — it's a symlink to `AGENTS.md`. Edit `AGENTS.md`.
- **New skills go through `/skill-creator`.** It enforces naming, description quality, the RED→GREEN cycle, and writes `evals.json` for you. Hand-authoring skills is allowed but they must still pass `pnpm skill-tools lint --severity error`.
- All skills (public and authoring/eval tooling like `skill-creator`, `skill-eval`) live in `skills/<kebab-case>/`.
- Local-only skills can optionally live in `.agents/skills/<kebab-case>/`. Mark them with `metadata.internal: true` to hide from the skills CLI and lint.
- Skill workspaces (nested at `<skill>/.workspace/`) are gitignored — only `evals.json` ships.
- Shared utilities go in `packages/<name>/` with their own `package.json` and follow the workspace name convention `@zrosenbauer/<name>`.
- Don't add a `package.json` to a skill directory unless it actually needs JS deps — most skills are pure markdown.
- Prefer editing existing skills over forking. If forking from a third-party skill, keep the upstream `LICENSE` alongside it.
