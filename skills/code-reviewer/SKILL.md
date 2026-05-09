---
name: code-reviewer
description: >-
  This skill should be used when the user wants to review code, audit a
  diff, get a second opinion on changes, or run an adversarial review of
  files in the current working tree. Common triggers include "review
  this code", "audit this diff", "find issues in", "second opinion on
  this", "harsh review of", "adversarial review", and "security review
  of". Picks one of four reviewer personas (adversarial, security,
  architecture, performance). Reviews local files, `git diff`, or
  `git diff --staged` only — does not fetch external content. Skip when
  the user wants formatting fixes (use a linter) or refactoring patterns
  (use ts-best-practices or ts-best-practices-functional).

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<file|dir|diff|staged>]'
user-invocable: true
model-invocable: true
---

# code-reviewer

Reviews code in the current working tree through a chosen persona. The reference docs live in [`references/`](references/) and are loaded **on demand** — the SKILL.md keeps the trigger surface lean; specifics for each persona get pulled in only when the user picks one.

## When to use

Verbatim trigger phrases:

- "review this code"
- "audit this diff"
- "find issues in this"
- "second opinion on this"
- "harsh review of"
- "adversarial review"
- "security review of"

## When NOT to use

- Formatting / style fixes → use a linter (`oxlint`, `eslint`, `prettier`, etc.)
- Refactoring patterns → use `ts-best-practices` or `ts-best-practices-functional`
- Reviewing pull requests from external repos / contributors → out of scope; the skill only reviews local files. If you need PR review, run it inside a trusted CI environment after vetting the source.
- Writing new code from scratch → this skill reviews existing code

## Inputs

`$ARGUMENTS` — one of:

- File or directory path (`src/foo.ts`, `src/`)
- `diff` — review `git diff`
- `staged` — review `git diff --staged`
- Empty — ask the user what to review

## Workflow

### 1. Determine scope

Resolve `$ARGUMENTS` to a concrete set of files + diff:

| Input         | Action                                                       |
| ------------- | ------------------------------------------------------------ |
| File/dir path | Read the file(s) directly                                    |
| `diff`        | `git diff`                                                   |
| `staged`      | `git diff --staged`                                          |
| empty         | Ask: "What should I review? (file path / `diff` / `staged`)" |

### 2. Choose persona — load on demand

Ask the user (use `AskUserQuestion` in Claude Code, or your agent's equivalent) which review angle:

- **Adversarial** — devil's advocate, harsh, looks for everything wrong → load [`references/adversarial-reviewer.md`](references/adversarial-reviewer.md)
- **Security** — threat modeling, OWASP, input handling → load [`references/security-reviewer.md`](references/security-reviewer.md)
- **Architecture** — design, abstractions, coupling, modularity → load [`references/architecture-reviewer.md`](references/architecture-reviewer.md)
- **Performance** — algorithmic complexity, memory, I/O patterns → load [`references/performance-reviewer.md`](references/performance-reviewer.md)
- **All four sequentially** — load each, run separate passes, merge findings

Only load the reference(s) the user picked. Don't pre-load all four — that's the whole point of progressive disclosure.

### 3. Run the review

Apply the loaded persona reference as the guiding lens. Read the code in scope, produce findings.

### 4. Format the output

Apply [`references/review-output-format.md`](references/review-output-format.md):

- Group findings by severity (`error` / `warn` / `info` — matches our skill-tools tiers)
- Use `file:line` references so the user can click to source
- Include a one-line summary at the top
- Quote relevant lines for context

## Examples

<example>
<input>"review the auth refactor in src/auth/" with adversarial persona</input>
<output>
1. Scope: read every file under `src/auth/`.
2. Persona: load `references/adversarial-reviewer.md`.
3. Run review through the adversarial lens — assume the code is broken, look for race conditions, missing null handling, leaked credentials, ignored errors.
4. Format per `references/review-output-format.md`. Output:

```
SUMMARY: 11 findings (3 error / 5 warn / 3 info)

ERRORS
✗ src/auth/session.ts:47  unsigned cookie used as identity check
✗ src/auth/login.ts:122   password compared with === (timing attack)
✗ src/auth/oauth.ts:88    PKCE code_verifier stored in localStorage

WARNS
⚠ src/auth/session.ts:31  session.userId can be null but isn't narrowed
...
```

</output>
</example>

<example>
<input>"security review of the staged changes"</input>
<output>
1. Scope: `git diff --staged`.
2. Persona: load `references/security-reviewer.md`.
3. Run review through the security lens — input validation, authn/authz boundaries, secret handling, injection sinks.
4. Format per `references/review-output-format.md`.
</output>
</example>

<example>
<good>
Loaded only `references/adversarial-reviewer.md` because the user picked
"adversarial". Other persona refs stayed on disk.
</good>

<bad>
Pre-loaded all four persona references "just in case". Wastes context
budget on every dispatch.
</bad>

The bad example violates the skill's progressive-disclosure design — references exist precisely so we don't pay the context cost when they're not needed.

## References

- [`references/adversarial-reviewer.md`](references/adversarial-reviewer.md) — harsh, devil's-advocate persona
- [`references/security-reviewer.md`](references/security-reviewer.md) — security-focused review lens
- [`references/architecture-reviewer.md`](references/architecture-reviewer.md) — design / coupling / modularity
- [`references/performance-reviewer.md`](references/performance-reviewer.md) — complexity, memory, I/O
- [`references/review-output-format.md`](references/review-output-format.md) — three-tier output spec
