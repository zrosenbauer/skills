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
model-invocable: false # manual-only: dispatcher does not auto-route
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

### 3. RED phase — write `evals.json` and run baselines

Pressure-test the gap _before_ writing the skill. See [`references/pressure-scenarios.md`](references/pressure-scenarios.md) for what makes a good scenario per skill type.

1. Ask the user for **3+ pressure scenarios**: realistic prompts (not abstract "convert this PDF" — specific, messy, with personal context).
2. For each scenario, decide assertions (regex / contains / file_exists) — see [`references/evals-json.md`](references/evals-json.md).
3. Write `skills/<name>/evals.json` from the [`templates/evals.json.template`](templates/evals.json.template).
4. Invoke [`/skill-eval <name>`](../../../skills/skill-eval) which dispatches Agent(general-purpose) for each scenario _without_ the skill loaded and saves transcripts to `<name>-workspace/iteration-1/eval-K-name/without_skill/`.
5. Inspect the without-skill transcripts (open one in `pnpm skill-tools view <name>`). If the baseline already passes the assertions cleanly, the skill is unnecessary — **tell the user and stop**. Better to skip than ship a no-op skill.

The transcripts are gitignored; the `evals.json` is committed.

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

Markdown headings (`## ...`, `### ...`) for structure. XML _only_ inside these tags ([when to use which](references/xml-usage.md)):

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

Run `pnpm skill-tools lint <name>`. All `error`-severity findings must clear; `warn` and `info` are advisory. If any rule fails, fix the SKILL.md and re-run.

The full rule list lives in [`references/lint-checklist.md`](references/lint-checklist.md). The TS implementation in `packages/skill-tools/src/lib/lint.ts` is the enforcer.

### 7. GREEN phase — re-run with the skill loaded

Invoke `/skill-eval <name>` again — this dispatches Agent(general-purpose) for each scenario _with_ the new skill in context, saves to `<name>-workspace/iteration-1/eval-K-name/with_skill/`, then grades.

Acceptance: every eval that failed without the skill should now pass. If any still fail, the skill body is missing instructions — patch and rerun. If any **regress** (passed without, now fails with), the skill introduced a problem — also patch and rerun.

### 7.5. Capture rationalizations (discipline skills only)

If this is a **discipline skill** (one that enforces rules the agent might rationalize skipping — e.g., "always run tests", "never use `any`", "always use Result"), read the with-skill transcripts. When the subagent skipped a rule and explained why, capture the excuse **verbatim** into a `## Rationalization table` section at the bottom of `SKILL.md`.

Format:

```markdown
## Rationalization table

| Skipped rule                | Verbatim excuse                   | Why it's wrong                                  |
| --------------------------- | --------------------------------- | ----------------------------------------------- |
| Always run the test         | "the change is tiny so I'll skip" | Tiny changes still break behavior; run the test |
| Use Result instead of throw | "this is just a quick prototype"  | Prototypes leak into prod; use Result anyway    |
```

Capturing excuses verbatim — not sanitized — is the point. Future agents recognize their own pattern. Skip this step for reference / pattern / technique skills with no rules to weasel out of.

### 8. Package

Write to `skills/<name>/`:

- `SKILL.md` — the skill body
- `evals.json` — the test definitions (already created in step 3)
- `LICENSE` — MIT (matches repo root)
- `README.md` — human-facing summary

Optional companions for non-trivial skills:

- `references/<topic>.md` — deeper rules referenced from SKILL.md
- `templates/<thing>.template` — boilerplate the skill scaffolds from

The sibling `<name>-workspace/` directory (transcripts, grading, benchmarks) is gitignored — only `evals.json` ships with the skill.

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

- [`references/evals-json.md`](references/evals-json.md) — `evals.json` schema and assertion types
- [`references/pressure-scenarios.md`](references/pressure-scenarios.md) — how to write good pressure scenarios per skill type
- [`references/tdd-for-skills.md`](references/tdd-for-skills.md) — RED → GREEN → REFACTOR cycle
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
