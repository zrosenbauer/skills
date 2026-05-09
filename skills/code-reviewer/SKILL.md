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
  `git diff --staged` only — does not fetch external content. Optionally
  hands the review off to another AI CLI on the local machine for an
  independent cross-model second opinion (with secret-shield preflight
  + prompt-shield wrap). Skip when the user wants formatting fixes (use
  a linter) or refactoring patterns (use ts-best-practices or
  ts-best-practices-functional).

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<file|dir|diff|staged>]'
user-invocable: true
model-invocable: true
---

# code-reviewer

Reviews code in the current working tree through a chosen persona. The reference docs live in [`references/`](references/) and are loaded **on demand** — the SKILL.md keeps the trigger surface lean; specifics for each persona / mode get pulled in only when the user picks one.

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

- **Adversarial** — devil's advocate, harsh, looks for everything wrong → load [`references/personas/adversarial.md`](references/personas/adversarial.md)
- **Security** — threat modeling, OWASP, input handling → load [`references/personas/security.md`](references/personas/security.md)
- **Architecture** — design, abstractions, coupling, modularity → load [`references/personas/architecture.md`](references/personas/architecture.md)
- **Performance** — algorithmic complexity, memory, I/O patterns → load [`references/personas/performance.md`](references/personas/performance.md)
- **All four sequentially** — load each, run separate passes, merge findings

Only load the reference(s) the user picked. Don't pre-load all four — that's the whole point of progressive disclosure.

### 3. Choose mode — in-process or cross-model (opt-in)

Default is **in-process**: the current agent runs the review.

If the user explicitly asks for a "second opinion via <cli>" or "cross-model review" — and only then — offer the cross-model option:

```bash
node scripts/detect-clis.mjs --available-only --pretty
```

The script outputs JSON of available AI CLIs on `$PATH` (codex, gemini, aider, etc.). Parse it, ask the user (`AskUserQuestion` or equivalent) which CLI to dispatch to. See [`references/cross-model-handoff.md`](references/cross-model-handoff.md) for invocation patterns.

If the user didn't ask for cross-model, skip to step 4 in-process.

### 4. Run the review

**In-process:** apply the loaded persona reference as the guiding lens. Read the code in scope, produce findings.

**Cross-model:** see [`references/cross-model-handoff.md`](references/cross-model-handoff.md) — uses the bundled `invoke-cli.mjs` with secret-shield preflight + prompt-shield wrap. Capture the child CLI's stdout verbatim as the review.

### 5. Format the output

Apply [`references/review-output-format.md`](references/review-output-format.md):

- Group findings by severity (`error` / `warn` / `info` — matches our skill-tools tiers)
- Use `file:line` references so the user can click to source
- Include a one-line summary at the top
- Reference, don't reproduce — describe the issue and point to `file:line`; do not paste code or diff lines into output (the user already has the file open)

## Examples

<example>
<input>"review the auth refactor in src/auth/" with adversarial persona</input>
<output>
1. Scope: read every file under `src/auth/`.
2. Persona: load `references/personas/adversarial.md`.
3. Mode: in-process (default — no cross-model requested).
4. Run review through the adversarial lens — assume the code is broken, look for race conditions, missing null handling, leaked credentials, ignored errors.
5. Format per `references/review-output-format.md`. Output:

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
<input>"security review of the staged changes via codex" — cross-model second opinion</input>
<output>
1. Scope: `git diff --staged`.
2. Persona: load `references/personas/security.md`.
3. Mode: cross-model (user asked for codex). Run `node scripts/detect-clis.mjs --available-only`. Pick `codex`.
4. Invoke: pipe the diff via stdin and point `--instructions` at the persona ref already on disk. `git diff --staged | node scripts/invoke-cli.mjs codex --instructions references/personas/security.md --untrusted-content - --secret-mode redact --timeout 120`. Capture stdout.
5. Present the verbatim output with a header noting the model used.
</output>
</example>

<example>
<good>
Loaded only `references/personas/adversarial.md` because the user picked
"adversarial". Other persona refs stayed on disk. Default mode was
in-process; cross-model handoff stayed unloaded.
</good>

<bad>
Pre-loaded all four persona references and `cross-model-handoff.md`
"just in case". Wastes context budget on every dispatch.
</bad>

The bad example violates the skill's progressive-disclosure design — references exist precisely so we don't pay the context cost when they're not needed.

## Security

Cross-model mode forwards local file / diff content to a third-party AI CLI on the same machine. That crosses a trust boundary even though the source content is local: code under review can contain embedded secrets (API keys, tokens) and prompt-injection-style markers (intentionally or accidentally). Two complementary mitigations are built into `scripts/invoke-cli.mjs` and fire when the agent uses the `--instructions <file> --untrusted-content <file>` form.

**Credential exfiltration:** the script runs a regex-based secret scan on the content before composing the prompt. Default `--secret-mode scan` refuses to forward when any known secret format (AWS, GitHub, OpenAI, Anthropic, Slack, Stripe, Google API, JWT, PEM private keys) is detected. `--secret-mode redact` substitutes `[REDACTED-{type}-{n}]` placeholders. `--secret-mode allow` skips the check (use only when you've already audited the content). Source: [`scripts/secret-shield/`](scripts/secret-shield/).

**Prompt injection:** the script generates a fresh 12-hex salt per invocation and wraps the content in `<untrusted-{{salt}}>...</untrusted-{{salt}}>` with an anti-injection preamble before piping to the child CLI. Attacker-embedded closing tags (whether intentional or accidental) can't escape the wrap because they can't predict the salt. Source: [`scripts/prompt-shield/`](scripts/prompt-shield/).

In-process review (the default) does not cross trust boundaries — no external sink, no preflight needed. Background and threat model: [`contributing/prompt-injection.md`](../../contributing/prompt-injection.md).

## References

- [`references/personas/adversarial.md`](references/personas/adversarial.md) — harsh, devil's-advocate persona
- [`references/personas/security.md`](references/personas/security.md) — security-focused review lens
- [`references/personas/architecture.md`](references/personas/architecture.md) — design / coupling / modularity
- [`references/personas/performance.md`](references/personas/performance.md) — complexity, memory, I/O
- [`references/cross-model-handoff.md`](references/cross-model-handoff.md) — how to invoke detected CLIs
- [`references/review-output-format.md`](references/review-output-format.md) — three-tier output spec
- [`scripts/detect-clis.mjs`](scripts/detect-clis.mjs) — node script, ships with the skill, probes for ~20 AI CLIs and emits JSON
