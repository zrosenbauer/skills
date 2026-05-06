# skill-creator

> Build, validate, and iterate agent skills in this monorepo.

A meta-skill that bakes in the conventions every skill in `zrosenbauer/skills` follows: kebab-case naming, "Use when" trigger phrases in descriptions, selective XML for example boundaries, and a TDD-style RED→GREEN evaluation loop.

## Install

```bash
npx skills add zrosenbauer/skills --skill skill-creator
```

The `npx skills` CLI installs into the right directory for whichever agent you target (Claude Code, Cursor, Codex, etc. — see [skills.sh](https://skills.sh) for the full list).

## What it does

When invoked, walks the agent through 8 steps to produce a clean SKILL.md:

1. **Discover** — clarify purpose, check for overlap with existing skills
2. **Name** — apply kebab-case rules, reject abbreviations
3. **RED phase** — define 3+ baseline scenarios that should improve with the skill
4. **Frontmatter** — write description with "Use when" + ≥3 verbatim trigger phrases
5. **Body** — Markdown headings for structure, XML only for example boundaries
6. **Self-lint** — run the bundled checklist
7. **GREEN phase** — verify scenarios pass with the skill loaded
8. **Package** — write to `skills/<name>/{SKILL.md, README.md, LICENSE}`

## Trigger phrases

- "build a skill for X"
- "create a new skill"
- "scaffold a skill"
- "make me a skill"
- "audit this skill against our rules"

## What's inside

```
skill-creator/
├── SKILL.md                      # the skill itself
├── README.md                     # this file
├── LICENSE                       # MIT
├── references/
│   ├── frontmatter.md            # frontmatter schema
│   ├── naming.md                 # kebab-case rules
│   ├── description.md            # description rules + anti-shortcut patterns
│   ├── xml-usage.md              # when to use XML vs Markdown
│   ├── tdd-for-skills.md         # RED→GREEN workflow
│   └── lint-checklist.md         # full self-lint checklist
└── templates/
    ├── SKILL.md.template         # boilerplate with placeholders
    ├── README.md.template        # readme boilerplate
    └── example-skill.md          # a fully-worked example skill
```

## Inspiration

- [`anthropics/skills/skill-creator`](https://github.com/anthropics/skills) — description optimization patterns
- [`zwbao/skill-creator-pro`](https://github.com/zwbao/skill-creator-pro) — TDD workflow + lint rules

## License

[MIT](./LICENSE) © Zac Rosenbauer
