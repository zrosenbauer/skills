---
name: skill-reviewer
description: >-
  This skill should be used when the user wants to review, audit, or
  sanity-check an existing agent skill in this repo against authoring
  conventions. Common triggers include "review the X skill", "audit this
  skill", "check skill X against repo conventions", "is this skill any good",
  "second opinion on skill X", "sanity check skill X", and "review skill X
  before publishing". Produces a severity-tiered report (error / warn / info)
  with a Clean section even on pass, and classifies the skill type. Skip
  when authoring a brand-new skill (use skill-creator) or running general
  code review (use code-reviewer).

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<skill-name>]'
user-invocable: true
---

# skill-reviewer

Reviews an existing skill in this repo against authoring conventions. Produces a severity-tiered report (error / warn / info) plus a Clean section, and classifies the skill type.

## Inputs

`$ARGUMENTS` — one of:

- A skill name (`ts-best-practices`) — looks under `skills/<name>/` then `.agents/skills/<name>/`
- A path (`skills/foo/SKILL.md` or `skills/foo`)
- Empty — ask: "Which skill should I review?"

## Workflow

### 1. Resolve target + run lint baseline

Locate the skill directory. Confirm `SKILL.md` exists. Run:

```bash
pnpm skill-toolkit lint <skill-name>
```

Capture the lint output verbatim — it's the floor, not the ceiling. Lint passing means **mechanical** rules pass; it does not mean the skill is well-authored.

### 2. Classify the skill type

Pick exactly one — this dictates which audit lens to apply:

| Type           | Examples                                                      | Audit focus                                                                          |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Discipline** | "always run the test", "never use `any`", "always use Result" | Rationalization table present? Body covers the realistic rationalizations?           |
| **Technique**  | "use ts-pattern for branching", "use zod for parsing"         | Triggers cover phrasings? Workflow is concrete (not abstract)?                       |
| **Pattern**    | "use \*Params for ≥2-arg fns", "kebab-case files"             | Description's `Skip when` covers counter-examples + recognition (when NOT to fire)?  |
| **Reference**  | "API X works like…", "convention Y says…"                     | Declines questions outside its scope? Reference depth matches the surface it claims? |

State the classification explicitly. If you can't classify it cleanly, that's itself a finding (the skill's purpose is fuzzy).

### 3. Read the deep references — not just the lint summary

Lint enforces frontmatter shape, naming, anti-shortcut words. Deep references cover what lint can't:

- [`skill-creator/references/description.md`](../skill-creator/references/description.md) — description quality beyond char count
- [`skill-creator/references/frontmatter.md`](../skill-creator/references/frontmatter.md) — frontmatter schema
- [`skill-creator/references/xml-usage.md`](../skill-creator/references/xml-usage.md) — when to use `<example>` / `<good>` / `<bad>`

If you skip these and only cite `lint-checklist.md`, you're guessing at depth.

### 4. Audit frontmatter + description

Beyond the lint pass:

- Description has all 3+ verbatim triggers in **double quotes**
- Description has an explicit `Skip when …` clause naming what the skill does NOT do
- Triggers in description are realistic (a real user would say them) — not abstract teacher-ese
- Description states what's distinctive ("Bakes in …") — not just what the skill does
- Body does NOT contain `## When to use` / `## When NOT to use` sections — routing is the description's job, and dispatchers never read the body anyway; duplicating triggers wastes tokens and creates drift risk (warn if present)
- Claude Code extension fields present where applicable (`argument-hint`, `user-invocable`, optionally `disable-model-invocation` and `allowed-tools`) and fenced behind the `# --- Claude Code extensions` comment. Flag any use of fabricated fields (`model-invocable`, `metadata`) — these aren't in the official Claude Code spec; see [skill-creator/references/frontmatter.md](../skill-creator/references/frontmatter.md).

### 5. Audit body

- ≥ 3 `## ` sections
- At least one `<example>` block
- No `TODO` / `FIXME` / `XXX`
- Workflow steps are numbered actions (not prose)
- Discipline skills SHOULD have a `## Rationalization table` section (per [`skill-creator`](../skill-creator/SKILL.md) step 6) — its absence on a discipline skill is a `warn`
- Body ≤ 500 lines

### 6. Emit severity-tiered output (with Clean section, even on pass)

Use this exact format. The Clean section is **mandatory** — it forces grounding the verdict in specific rules rather than vibes.

```
SUMMARY: <N> findings (<E> error / <W> warn / <I> info) — <skill-type> skill

## ERRORS
✗ <file>:<line>  <one-line-finding>
  <body — what's wrong, why it matters, suggested edit>

## WARNS
⚠ <file>:<line>  <one-line-finding>
  <body>

## INFOS
ℹ <file>:<line>  <one-line-finding>
  <body>

## Clean
- <specific rule that passes — e.g., "Description has 5 verbatim triggers in double quotes (description.md:38)">
- <another specific rule>
- <`pnpm skill-toolkit lint <name>` — <pass/fail summary>>
```

Empty severity sections render as `## ERRORS\n(none)` — keeps the shape comparable across runs. A pass verdict is `0 error / 0 warn / 0 info` plus a populated Clean section.

## Anti-patterns (don't do these)

<bad>
"Looks solid, ship it."
</bad>

No grounding. The pass verdict carries no information the user can act on or revisit later. Use a Clean section listing specific rules.

<bad>
"Lint passes, looks fine."
</bad>

Lint is the floor. This is the lazy-reviewer failure mode — see step 3.

<bad>
Manufactured nits because the skill seemed *too* clean and the reviewer wanted to look thorough.
</bad>

If a skill genuinely has 0 findings, say so in the Clean section. Inventing critique to look thorough is worse than missing real issues.

## Examples

<example>
<input>"review skills/ts-best-practices — does it still hold up against our conventions?"</input>
<output>
1. Resolve: `skills/ts-best-practices/`. Run `pnpm skill-toolkit lint ts-best-practices` → clean.
2. Classify: **discipline skill** (rules like "use *Params for ≥2-arg fns", "JSDoc on exports").
3. Read deep references: `description.md`, `frontmatter.md`, `xml-usage.md`.
4. Frontmatter audit: trigger parity drift — `SKILL.md` has 6 triggers, `description` and `README.md` have 5. Description missing `"audit this ts file"`.
5. Body audit: rationalization table present (good — discipline skill). `@pkg/fp` in conditionals table leaks an internal-monorepo assumption.
6. Emit:

```
SUMMARY: 3 findings (0 error / 2 warn / 1 info) — discipline skill

## ERRORS
(none)

## WARNS
⚠ description (SKILL.md:5)  trigger parity drift vs. README.md (5 vs 6 triggers; missing "audit this ts file")
  Add the missing trigger to description and README — the description is the dispatcher's surface.
⚠ SKILL.md:184  `@pkg/fp` reference leaks a private-monorepo assumption into a public skill
  Replace with "ternary helper" or add a one-line reference link.

## INFOS
ℹ description (SKILL.md:11)  Skip-when bundles two cases with an em dash
  Split the framework case (React/Vue/Svelte) from the functional-refactor redirect.

## Clean
- Description has Use-when phrase + 5 verbatim triggers in double quotes (description.md:38)
- Frontmatter has the documented Claude Code extension fields (argument-hint, user-invocable)
- Body has 2 <example> blocks (xml-usage.md ≥ 1 required)
- Rationalization table present — appropriate for a discipline skill (skill-creator step 6)
- pnpm skill-toolkit lint ts-best-practices — 0 error / 0 warn / 0 info
```

</output>
</example>

<example>
<input>"sanity-check skills/skill-portability — i think it's fine"</input>
<output>
Lint clean. Classified as a **technique skill** (replaces ad-hoc provider knowledge with a structured providers.mjs lookup).

```
SUMMARY: 0 findings (0 error / 0 warn / 0 info) — technique skill

## ERRORS
(none)

## WARNS
(none)

## INFOS
(none)

## Clean
- Description: 720 chars, has Use-when, 5 verbatim triggers, explicit Skip-when (description.md ✓)
- Frontmatter: argument-hint, user-invocable set; no fabricated fields
- Body: ≥ 3 `## ` sections, ≥ 1 `<example>` block, no TODO/FIXME
- Companions: README.md, LICENSE, references/, scripts/ all present
- Single-source-of-truth in providers.mjs reflects the skill's own thesis
- pnpm skill-toolkit lint skill-portability — 0/0/0
```

Nothing manufactured. If you want depth beyond the structural review, run `node skills/skill-portability/scripts/providers.mjs --check` to confirm the docUrls are still 200 — that's the skill's own staleness check.

</output>
</example>

## Rationalization table

Captured from baseline transcripts where reviewers without this skill skipped rules. Future reviewers: recognize your own pattern.

| Skipped rule                                                           | Verbatim excuse                            | Why it's wrong                                                                                                                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read deep references beyond `lint-checklist.md`                        | "relied on lint-checklist summary"         | Lint enforces mechanical rules; the deep references cover description quality, frontmatter shape, and XML usage rules that lint cannot check                                            |
| Classify the skill type (discipline / technique / pattern / reference) | (omitted entirely)                         | Different types need different audits — discipline skills require a rationalization table; pattern skills need recognition tests; without classification you're applying the wrong lens |
| Use severity-tiered output (`error` / `warn` / `info`) even on a pass  | "used numbered findings" / "prose verdict" | Comparable output across runs; numbered lists drift in shape; prose ("looks solid") invites manufactured-nits or vague-pass failure modes                                               |
| Include a Clean section listing what specifically passes               | "said 'looks solid' / 'ship it'"           | Pass verdicts without specifics rot — six months later nobody knows what was actually checked. Clean sections force grounding in specific rules                                         |

## References

- [`skill-creator/SKILL.md`](../skill-creator/SKILL.md) — authoring workflow this reviewer audits against
- [`skill-creator/references/description.md`](../skill-creator/references/description.md) — description quality rules
- [`skill-creator/references/frontmatter.md`](../skill-creator/references/frontmatter.md) — frontmatter schema
- [`skill-creator/references/lint-checklist.md`](../skill-creator/references/lint-checklist.md) — mechanical rules (the floor)
- [`skill-creator/references/xml-usage.md`](../skill-creator/references/xml-usage.md) — `<example>` / `<good>` / `<bad>` boundaries
- [`code-reviewer/references/review-output-format.md`](../code-reviewer/references/review-output-format.md) — three-tier output spec inspiration
