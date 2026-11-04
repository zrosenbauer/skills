<img src="./.github/assets/banner.png" alt="SKILLS — by @zrosenbauer" width="100%" />

<p align="center">
  <a href="https://skills.sh/zrosenbauer/skills"><img src="https://skills.sh/b/zrosenbauer/skills" alt="skills.sh" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-d97757?style=flat-square" alt="MIT" /></a>
</p>

The skills I use to review code, refactor TypeScript, debug running apps, and build better skills.

For Claude Code, Cursor, Codex, OpenCode, and other skills-compatible agents.

## Install

```bash
# just one
npx skills add zrosenbauer/skills --skill ts-best-practices

# the whole collection
npx skills add zrosenbauer/skills
```

The [`skills` CLI](https://www.npmjs.com/package/skills) handles discovery and placement for your agent.

## Skills

| Skill                                                                 | What it does                                                                   |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [code-reviewer](./skills/code-reviewer)                               | Review local files and diffs for bugs, security, architecture, and performance |
| [ts-best-practices](./skills/ts-best-practices)                       | Write and refactor idiomatic TypeScript                                        |
| [ts-best-practices-functional](./skills/ts-best-practices-functional) | Refactor toward Result types, immutable data, and pure functions               |
| [live-debug](./skills/live-debug)                                     | Run tracked dev servers and inspect their pages                                |
| [npm-namer](./skills/npm-namer)                                       | Find available npm package names and check naming collisions                   |
| [svg-creator](./skills/svg-creator)                                   | Create, preview, and convert SVG assets                                        |
| [skill-creator](./skills/skill-creator)                               | Author a skill with naming and description checks                              |
| [skill-reviewer](./skills/skill-reviewer)                             | Audit a skill's instructions and supporting references                         |
| [skill-portability](./skills/skill-portability)                       | Check a skill's compatibility across agent environments                        |
| [orca-doctor](./skills/orca-doctor)                                   | Diagnose Orca worktree problems and plan recovery                              |
| [persona](./skills/persona)                                           | Change your agent's conversational voice                                       |

## Use

After installing, give your agent a task. For example:

| To use…                      | Ask your agent…                                                 |
| ---------------------------- | --------------------------------------------------------------- |
| code-reviewer                | "Review my staged changes for security issues."                 |
| ts-best-practices-functional | "Refactor this module to use Result types instead of throwing." |
| skill-portability            | "Check whether this skill works in Codex and Cursor."           |

For explicit slash commands in OpenCode, see [OpenCode command setup](./contributing/opencode-commands.md).

## Contributing

Want to add a skill, fix a bug, or fork one for your own use? See [CONTRIBUTING.md](./CONTRIBUTING.md) for the dev setup, skill authoring workflow, and conventions.

[Behavioral evaluations](contributing/evaluations.md) run real agent CLI calls
from Promptfoo YAML (`pnpm eval:skills`).

## License

[MIT](./LICENSE) © Zac Rosenbauer
