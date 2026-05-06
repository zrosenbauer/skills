---
name: skill-creator
description: >-
  This skill should be used when the user wants to create a new agent skill,
  scaffold a SKILL.md, validate an existing skill against repo rules, or
  refactor a skill to match this monorepo's conventions. Common triggers
  include "build a skill for X", "create a new skill", "scaffold a skill",
  "add a skill that does Y", "make me a skill", and "audit this skill against
  our rules". Bakes in kebab-case naming, verbatim trigger phrases in
  descriptions, selective XML for example boundaries, and a RED→GREEN
  evaluation loop. Skip when modifying source code, debugging, or writing
  non-skill markdown.
# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<skill-name>]'
user-invocable: true
model-invocable: false  # manual-only: dispatcher does not auto-route

# --- skills CLI (vercel-labs) ---
metadata:
  internal: true  # hide from `npx skills add --list`; the CLI scans recursively
---

# skill-creator

Build, validate, and iterate agent skills in this monorepo. Bakes in the conventions every skill here follows: kebab-case naming, "Use when" trigger phrases, selective XML for example boundaries, and a RED→GREEN evaluation loop.

## When to use

Verbatim trigger phrases the user might say:

- "build a skill for X"
- "create a new skill"
- "scaffold a skill"
- "add a skill that does Y"
- "make me a skill"
- "audit this skill against our rules"
- "refactor this skill to match repo conventions"

## When NOT to use

- User is modifying source code, not skills
- User is debugging an existing skill (just edit it directly)
- User wants to install a third-party skill (`npx skills add <repo>`)
- User is writing non-skill markdown (docs, READMEs, etc.)

## Workflow

### 1. Discover

Clarify what the skill should do. Answer these before scaffolding:

1. What user request triggers this skill? Capture verbatim phrases.
2. Does an existing skill in `skills/` already cover this? Run `ls skills/` and skim each `SKILL.md` description.

If overlap is >70%, propose extending the existing skill instead.

### 2. Name

Apply [`references/naming.md`](references/naming.md). Quick check:

- `kebab-case-with-hyphens` only
- Matches `^[a-z][a-z0-9-]+[a-z0-9]$`
- ≤64 chars
- No abbreviations like `bestpractices` — use `best-practices`
- Prefer `<domain>-<focus>` (e.g., `ts-best-practices`) over generic `<thing>-rules`

### 3. RED phase

Define 3+ baseline scenarios where the skill should help. For each:

- Write the verbatim user prompt that triggers the scenario
- Mentally run that prompt *without* the skill — what does the agent do? Where does it fail?
- Capture failures verbatim (not paraphrased), e.g., "agent writes ad-hoc parser instead of using zod"

These scenarios become the skill's regression suite. They live in the SKILL.md body or in `tests/baseline.md`.

See [`references/tdd-for-skills.md`](references/tdd-for-skills.md).

### 4. Draft frontmatter

Skills here are agent-agnostic: `name` and `description` are universally required (the `skills` CLI rejects skills missing either); the others are Claude Code extensions kept for cross-agent compatibility (other agents ignore them). Full schema in [`references/frontmatter.md`](references/frontmatter.md).

```yaml
---
name: <skill-name>
description: >-
  This skill should be used when [trigger condition]. Common triggers
  include "verbatim phrase 1", "verbatim phrase 2", and "verbatim phrase 3".
  [What it bakes in / what's distinctive]. Skip when [anti-trigger].

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<optional-arg>]'
user-invocable: true
model-invocable: true
---
```

`name` must exactly match the skill's directory name (kebab-case).

Description rules ([full list](references/description.md)):

- 80–1024 characters
- Contains `"Use when"` or `"This skill should be used when"`
- Lists ≥3 verbatim trigger phrases in double quotes
- No anti-shortcut words: `then`, `next`, `step 1`, `process`, `first` — these get followed as instructions instead of treated as triggers
- Includes a `Skip when` clause naming what the skill does NOT do

### 5. Draft body

Markdown headings (`## ...`, `### ...`) for structure. XML *only* inside these tags ([when to use which](references/xml-usage.md)):

- `<example>` for full scenarios
- `<good>` / `<bad>` for contrast pairs
- `<input>` / `<output>` for tool-call boundaries

Typical body sections:

- `## When to use` — verbatim trigger phrases
- `## When NOT to use` — anti-triggers
- `## Workflow` — numbered actions the agent takes
- `## Examples` — at least one `<example>` block
- `## References` — links to companion docs

### 6. Self-lint

Run [`references/lint-checklist.md`](references/lint-checklist.md). All hard rules must pass. If a rule fails, fix the SKILL.md and re-check.

### 7. GREEN phase

Re-run the RED scenarios *as if* the skill were loaded. Each scenario should pass cleanly. If any still fails, the skill body is missing instructions — add them and re-lint.

### 8. Package

Write to `skills/<name>/`:

- `SKILL.md` — the skill body
- `LICENSE` — MIT (matches repo root)
- `README.md` — human-facing summary

Optional companions for non-trivial skills:

- `references/<topic>.md` — deeper rules referenced from SKILL.md
- `templates/<thing>.template` — boilerplate the skill scaffolds from
- `tests/baseline.md` — the RED scenarios

## Examples

<example>
<input>User says: "build me a skill for parsing TOML config files"</input>
<output>
1. Discover — confirm: "Should this trigger on `*.toml` files? Or any time the user mentions TOML?" Check `skills/` for overlap (none).
2. Name — propose `toml-config-parser` (kebab-case, descriptive).
3. RED — three scenarios: (a) "parse this config.toml", (b) "validate the toml schema", (c) "convert toml to json". Without the skill, agent uses ad-hoc string parsing.
4. Frontmatter — description includes "Use when", lists 3 trigger phrases, adds "Skip when working with YAML or JSON".
5. Body — markdown sections, one `<example>` showing parse-validate-output.
6. Self-lint — name matches regex; description = 412 chars, contains "Use when"; no anti-shortcut words; XML balances.
7. GREEN — rerun RED scenarios; agent now uses zod + smol-toml.
8. Package — write `skills/toml-config-parser/{SKILL.md, README.md, LICENSE}`.
</output>
</example>

<example>
<good>
description: >-
  This skill should be used when the user wants to refactor TypeScript
  code to follow functional patterns. Common triggers include "make this
  functional", "remove the class", and "use Result instead of throw".
  Bakes in factory functions over classes, Result<T,E> over exceptions,
  and immutable state. Skip when working with framework-required classes
  (PrismaClient, etc.).
</good>

<bad>
description: >-
  This skill helps with TypeScript. First it analyzes the code, then it
  refactors it. The process involves several steps.
</bad>

The `<bad>` example fails three rules: no "Use when" phrase, no verbatim trigger phrases in quotes, contains anti-shortcut words ("first", "then", "process") that cause the agent to follow them as instructions instead of treating them as triggers.
</example>

## References

- [`references/frontmatter.md`](references/frontmatter.md) — frontmatter schema
- [`references/naming.md`](references/naming.md) — naming rules
- [`references/description.md`](references/description.md) — description rules + anti-shortcut patterns
- [`references/xml-usage.md`](references/xml-usage.md) — when to use XML vs Markdown
- [`references/tdd-for-skills.md`](references/tdd-for-skills.md) — RED→GREEN workflow
- [`references/lint-checklist.md`](references/lint-checklist.md) — full self-lint checklist

## Templates

- [`templates/SKILL.md.template`](templates/SKILL.md.template) — boilerplate with placeholders
- [`templates/README.md.template`](templates/README.md.template) — readme boilerplate
- [`templates/example-skill.md`](templates/example-skill.md) — fully-worked example skill
