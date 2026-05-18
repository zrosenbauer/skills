# skill-creator

> Build, validate, and iterate agent skills in this monorepo.

A meta-skill that bakes in the conventions every skill in `zrosenbauer/skills` follows: kebab-case naming, "Use when" trigger phrases in descriptions, and selective XML for example boundaries.

## Use

Invoke manually with `/skill-creator` (Claude Code) — `disable-model-invocation: true` keeps Claude from auto-routing to it; you drive the loop.

## What it does

When invoked, walks the agent through 7 steps to produce a clean SKILL.md:

1. **Discover** — clarify purpose, check for overlap with existing skills
2. **Name** — apply kebab-case rules, reject abbreviations
3. **Frontmatter** — write description with "Use when" + ≥3 verbatim trigger phrases
4. **Body** — Markdown headings for structure, XML only for example boundaries
5. **Self-lint** — run the bundled checklist
6. **Capture rationalizations** (discipline skills only) — dispatch a subagent, harvest excuses verbatim
7. **Package** — write to `skills/<name>/{SKILL.md, README.md, LICENSE}`

## Trigger phrases

- "build a skill for X"
- "create a new skill"
- "scaffold a skill"
- "add a skill that does Y"
- "make me a skill"
- "audit this skill against our rules"
- "refactor this skill to match repo conventions"

## What's inside

```
skill-creator/
├── SKILL.md                      # the skill itself
├── README.md                     # this file
├── LICENSE                       # MIT
├── references/
│   ├── description.md            # description rules + anti-shortcut patterns
│   ├── frontmatter.md            # frontmatter schema
│   ├── lint-checklist.md         # full self-lint checklist
│   ├── naming.md                 # kebab-case rules
│   └── xml-usage.md              # when to use XML vs Markdown
└── templates/
    ├── SKILL.md.template         # boilerplate with placeholders
    ├── README.md.template        # readme boilerplate
    └── example-skill.md          # a fully-worked example skill
```

## Inspiration

- [`anthropics/skills/skill-creator`](https://github.com/anthropics/skills) — description optimization patterns

## License

[MIT](./LICENSE) © Zac Rosenbauer
