# skills

> A curated collection of [agent skills](https://skills.sh) for AI coding assistants — battle-tested for TypeScript reviews, refactors, skill authoring, and cross-agent portability.

[![skills.sh](https://skills.sh/b/zrosenbauer/skills)](https://skills.sh/zrosenbauer/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Skills are markdown files (`SKILL.md`) that tell an AI agent **when** and **how** to do something specific. They're agent-agnostic — drop them into Claude Code, Cursor, Codex, or any tool that supports the [skills.sh](https://skills.sh) format.

This repo publishes the skills I use every day, each one pressure-tested with real evals before it ships.

## Install

Pick the install you want — all the skills, or just one.

```bash
# Install every skill
npx skills add zrosenbauer/skills

# Install one skill
npx skills add zrosenbauer/skills --skill ts-best-practices
```

The [`skills` CLI](https://www.npmjs.com/package/skills) handles discovery and placement for your agent.

## What's in here

| Skill | Use it when… |
| --- | --- |
| [`code-reviewer`](./skills/code-reviewer) | You want an adversarial review of a diff or PR — finds real issues, not nits. |
| [`ts-best-practices`](./skills/ts-best-practices) | Writing or refactoring TypeScript and want idiomatic, industry-standard patterns. |
| [`functional-ts-best-practices`](./skills/functional-ts-best-practices) | Refactoring TS toward functional patterns — Result types, factories, no mutation. |
| [`skill-creator`](./skills/skill-creator) | Authoring a new skill from scratch with the RED→GREEN eval cycle baked in. |
| [`skill-eval`](./skills/skill-eval) | Re-running baselines on existing skills after a model upgrade. |
| [`skill-portability`](./skills/skill-portability) | Checking whether a skill works across Claude Code, Cursor, Codex, and others. |

Each skill has its own `SKILL.md` and `evals.json` under [`skills/<name>/`](./skills).

## Compatibility

These skills target the [skills.sh](https://skills.sh) `SKILL.md` spec, so they work with any compliant agent:

- **Claude Code** — full support, including extended frontmatter (`argument-hint`, `user-invocable`, `model-invocable`)
- **Cursor**, **OpenAI Codex CLI**, **Gemini CLI**, **OpenCode**, **Pi** — supported via the universal `name` + `description` core
- **Custom agents** — anything that loads `SKILL.md` files

## Why pressure-tested?

Every public skill ships with an `evals.json` — at least three realistic scenarios with deterministic assertions. That means each skill has been proven to:

1. Solve a real failure mode the underlying model gets wrong by default (RED baseline)
2. Reliably correct that failure once the skill is loaded (GREEN run)

No vibes-based skills. If it's published here, it's been graded.

## Contributing

Want to add a skill, fix a bug, or fork one for your own use? See [CONTRIBUTING.md](./CONTRIBUTING.md) for the dev setup, skill authoring workflow, and conventions.

## License

[MIT](./LICENSE) © Zac Rosenbauer
