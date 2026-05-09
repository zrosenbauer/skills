# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex, etc.) working in this repo.

## What this repo is

A personal monorepo for [agent skills](https://skills.sh) authored by Zac Rosenbauer. Skills are agent-agnostic — they target the `SKILL.md` format and work with any agent that loads it (Claude Code, Cursor, Codex, custom agents, etc.). Skills live in `skills/<skill-name>/`. Shared utilities (if any) live as pnpm workspace packages in `packages/`.

## Layout

```
.
├── skills/              # AUTHORING SOURCE — skills authored here, published via `npx skills add`
│   └── <name>/
│       ├── SKILL.md     # the skill
│       ├── evals.json   # ≥3 pressure scenarios + assertions (committed)
│       ├── LICENSE
│       ├── README.md
│       └── .workspace/  # GITIGNORED — transcripts, grading, benchmarks (per skill)
├── .agents/skills/      # INSTALL DESTINATION — where `npx skills add` puts installed skills
├── skills-lock.json     # tracks installed skills (source, sourceType, skillPath, hash)
├── skill-scripts/       # canonical source for shared scripts (e.g. prompt-shield)
│   └── <name>/          # vendored into `<skill>/scripts/<name>/` via `skill-tools sync-scripts`
├── packages/
│   └── skill-tools/     # CLI for linting + evaluating skills (kidd + Ink TUI)
├── contributing/        # supplementary contributor docs (e.g. prompt-injection.md)
├── lefthook.yml         # pre-commit hooks (sync, format, lint, drift check)
├── package.json         # root, private, workspaces via pnpm-workspace.yaml
├── pnpm-workspace.yaml  # workspace globs
├── turbo.json           # turbo task pipeline
└── AGENTS.md            # ← you are here (CLAUDE.md is a symlink to this file)
```

**Two locations, two roles:**

- `skills/<name>/` is the **authoring source**. Skills authored here are published via `npx skills add zrosenbauer/skills`. Claude Code in this project also loads from here directly — no symlink needed.
- `.agents/skills/<name>/` is the **install destination** managed by the skills CLI. When you run `npx skills add`, installed skills land here and `skills-lock.json` records the source/hash. The same skill can appear in both paths (you can dogfood your own skills by installing them locally) — these are NOT duplicates and `.agents/skills/` should not be hand-edited or `rm`'d. Use the skills CLI to install/uninstall.

All skills under `skills/` are public by design — every skill ships through `npx skills add` and gets audited by skills.sh. There are no local-only / internal skills in this repo.

### Sharing scripts between skills

Helpers needed by more than one skill (e.g. `prompt-shield` for indirect-prompt-injection mitigation) live in `skill-scripts/<name>/` as the canonical source. Each consuming skill declares it in `<skill>/scripts.json` (`{ "scripts": ["prompt-shield"] }`) and `pnpm skill-tools sync-scripts` vendors a byte-identical copy into `<skill>/scripts/<name>/`. Vendored copies are committed so skills stay self-contained when shipped.

**Never edit a vendored copy.** Edit `skill-scripts/<name>/` and let the sync run (Lefthook does this automatically on pre-commit). The drift check (`pnpm skill-tools sync-scripts --check`, also pre-commit) fails if any vendored copy diverges from source. See [`contributing/prompt-injection.md`](contributing/prompt-injection.md) for the threat model and the prompt-shield consumption examples.

## Skill format

Each skill is a directory under `skills/` with at minimum:

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

Every skill in `skills/` MUST ship an `evals.json` (≥ 3 pressure scenarios + assertions). The lint blocks shipping otherwise. See [`evals.json` schema](skills/skill-creator/references/evals-json.md) and [pressure scenarios guide](skills/skill-creator/references/pressure-scenarios.md).

Optional companions: `LICENSE`, `README.md`, `references/<topic>.md`, `templates/<thing>.template`.

## Tooling

- **pnpm** for installs (`packageManager` is pinned in root `package.json`)
- **turbo** for running tasks across workspace packages
- **Node ≥ 20**

Common commands:

```bash
pnpm install                           # install all workspace deps + lefthook hooks (via prepare)
pnpm build                             # turbo run build (compiles skill-tools via kidd)
pnpm lint                              # turbo run lint
pnpm typecheck                         # turbo run typecheck
pnpm test                              # turbo run test
pnpm test:scripts                      # node --test across skills/*/scripts and skill-scripts/*
pnpm skill-tools lint                  # lint every skill against the three-tier rule set
pnpm skill-tools lint <name>           # lint one skill
pnpm skill-tools view                  # TUI: browse skills / iterations / transcripts
pnpm skill-tools benchmark <name>      # aggregate iteration grading into benchmark.md
pnpm skill-tools sync-scripts          # vendor canonical scripts into each consuming skill
pnpm skill-tools sync-scripts --check  # fail if any vendored copy drifts from source
pnpm audit:skills                      # snyk-agent-scan on public skills (needs SNYK_TOKEN)
```

Authoring and evaluating skills:

- **`/skill-creator <name>`** — author a new skill (interactive workflow: pressure scenarios → RED baselines → SKILL.md → GREEN re-run → lint → package)
- **`/skill-eval <name>`** or `/skill-eval --all` — re-run baselines on existing skills (after a Claude version upgrade, before publishing, etc.)

## Conventions for agents

- **Never edit `CLAUDE.md` directly** — it's a symlink to `AGENTS.md`. Edit `AGENTS.md`.
- **New skills go through `/skill-creator`.** It enforces naming, description quality, the RED→GREEN cycle, and writes `evals.json` for you. Hand-authoring skills is allowed but they must still pass `pnpm skill-tools lint --severity error`.
- All skills live in `skills/<kebab-case>/` — including authoring/eval tooling like `skill-creator` and `skill-eval`. Every skill is publicly distributed.
- Never hand-edit or `rm` anything under `.agents/skills/` — that's the install destination managed by the skills CLI (tracked by `skills-lock.json`).
- Skill workspaces (nested at `<skill>/.workspace/`) are gitignored — only `evals.json` ships.
- Shared utilities go in `packages/<name>/` with their own `package.json` and follow the workspace name convention `@zrosenbauer/<name>`.
- Don't add a `package.json` to a skill directory unless it actually needs JS deps — most skills are pure markdown.
- Prefer editing existing skills over forking. If forking from a third-party skill, keep the upstream `LICENSE` alongside it.
