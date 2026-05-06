# Self-lint checklist

Run this against any skill before committing. Hard rules block; soft rules warn.

## Hard rules (must pass)

### Naming

- [ ] Directory name matches `^[a-z][a-z0-9-]+[a-z0-9]$`
- [ ] Length ≤ 64 chars
- [ ] No double hyphens, no leading/trailing hyphens
- [ ] No underscores, dots, camelCase, or PascalCase
- [ ] Not generic (`temp`, `skill1`, `new-skill`)

→ See [naming.md](naming.md)

### Frontmatter

- [ ] Parses as valid YAML (no syntax errors)
- [ ] Contains all required fields: `description`, `argument-hint`, `user-invocable`, `model-invocable`
- [ ] `user-invocable` and `model-invocable` are booleans
- [ ] `argument-hint` is a single-line string

→ See [frontmatter.md](frontmatter.md)

### Description

- [ ] 80–1024 characters
- [ ] Contains `"Use when"` or `"This skill should be used when"`
- [ ] Lists ≥ 3 verbatim trigger phrases in double quotes
- [ ] No anti-shortcut words: `then`, `next`, `step 1`, `process`, `first`
- [ ] Includes a `Skip when` clause

→ See [description.md](description.md)

### Body

- [ ] At least 3 `## ...` sections
- [ ] ≤ 500 lines total
- [ ] No `TODO`, `FIXME`, `XXX` markers
- [ ] All XML tags balanced (every `<example>` has a closing `</example>`, etc.)
- [ ] At least one `<example>` block (for non-trivial skills)
- [ ] Only the canonical XML tags used: `<example>`, `<good>`, `<bad>`, `<input>`, `<output>`

→ See [xml-usage.md](xml-usage.md)

### RED scenarios

- [ ] At least 3 baseline scenarios documented (in body or `tests/baseline.md`)
- [ ] Each has verbatim prompt + expected behavior + actual-without-skill
- [ ] Failures captured verbatim (code/output, not paraphrased)

→ See [tdd-for-skills.md](tdd-for-skills.md)

## Soft rules (warnings)

- [ ] `LICENSE` file present (MIT recommended for forkable skills)
- [ ] `README.md` present (human-facing summary)
- [ ] Description has both "Use when" AND "Skip when" clauses
- [ ] Trigger phrases cover ≥ 2 phrasing styles (imperative + question, or formal + casual)
- [ ] Body links to relevant `references/` and `templates/` files

## How to run

The checklist is markdown. The agent reads it and applies each item to the skill's files. There's no compiled validator — if you find yourself missing the same rule twice, that's the signal to add a TS lint script in a `packages/skill-tools` package.

For now: read the skill files, walk the checklist, fix what fails, re-check.
