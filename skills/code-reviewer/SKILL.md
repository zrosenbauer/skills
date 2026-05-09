---
name: code-reviewer
description: >-
  This skill should be used when the user wants to review code, audit a
  diff, get a second opinion on changes, or run an adversarial review of
  files in the current working tree. Common triggers include "review
  this code", "audit this diff", "find issues in", "second opinion on
  this", "harsh review of", "adversarial review", and "security review
  of". Picks one or more reviewer personas (adversarial, security,
  architecture, performance). Reviews local files, `git diff`, or
  `git diff --staged` only — does not fetch external content. Runs in
  one of four modes: single-agent (one persona in the current agent),
  cross-model handoff (independent second opinion via another local AI
  CLI, with secret-shield preflight + prompt-shield wrap), multi-bg-agent
  (one persona per parallel background subagent), or agent-team
  (Claude Code Teams or equivalent on supporting agents). Skip when the
  user wants formatting fixes (use a linter) or refactoring patterns
  (use ts-best-practices or ts-best-practices-functional).

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

### 2. Choose persona(s) — load on demand

Ask the user (use `AskUserQuestion` in Claude Code, or your agent's equivalent) which review angle. **Multi-select** — the user can pick one, several, or all four:

- **Adversarial** — devil's advocate, harsh, looks for everything wrong → load [`references/personas/adversarial.md`](references/personas/adversarial.md)
- **Security** — threat modeling, OWASP, input handling → load [`references/personas/security.md`](references/personas/security.md)
- **Architecture** — design, abstractions, coupling, modularity → load [`references/personas/architecture.md`](references/personas/architecture.md)
- **Performance** — algorithmic complexity, memory, I/O patterns → load [`references/personas/performance.md`](references/personas/performance.md)
- **All four** — convenience option; loads all persona refs and recommends a parallel mode in step 3

Only load the references the user picked. Don't pre-load all four unless they asked — that's the whole point of progressive disclosure.

If the user picked more than one persona, **prefer a parallel mode in step 3** (multi-bg-agent or agent-team). Sequential in-process across multiple personas is slow and pollutes context.

### 3. Choose mode

Four modes, with recommendations driven by persona count and host agent:

| Mode                                                     | Best for                                                                                           | Reference                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **In-process** (allowed; not recommended for >1 persona) | Single persona; quick review                                                                       | (no extra ref)                                                           |
| **Cross-model handoff**                                  | Independent second opinion from a different model on the same machine                              | [`references/cross-model-handoff.md`](references/cross-model-handoff.md) |
| **Multi-bg-agent**                                       | Multiple personas in parallel; works on most agent harnesses                                       | [`references/parallel-execution.md`](references/parallel-execution.md)   |
| **Agent team**                                           | Multiple personas with explicit coordination; Claude Code Teams or equivalent on supporting agents | [`references/parallel-execution.md`](references/parallel-execution.md)   |

Recommendation logic:

- **1 persona, default:** in-process is fine. Offer cross-model only if the user asked for a "second opinion via <cli>".
- **>1 persona, Claude Code (or agent with native team primitive):** recommend **agent team**.
- **>1 persona, other agents:** recommend **multi-bg-agent**.
- **In-process across multiple personas:** allowed, but flag the cost (sequential, context pollution) and confirm before running.

Ask the user (`AskUserQuestion` or equivalent) to confirm. Load only the reference(s) for the chosen mode.

For cross-model, also detect available CLIs:

```bash
node scripts/detect-clis.mjs --available-only --pretty
```

The script outputs JSON of available AI CLIs on `$PATH` (codex, gemini, aider, etc.). Parse it, ask which CLI to dispatch to.

### 4. Run the review

**In-process:** apply the loaded persona reference as the guiding lens. Read the code in scope, produce findings. If multiple personas were selected and the user accepted in-process anyway, run them one at a time and merge findings using the rules in [`references/parallel-execution.md`](references/parallel-execution.md) §"Step 4 — Merge".

**Cross-model:** see [`references/cross-model-handoff.md`](references/cross-model-handoff.md) — uses the bundled `invoke-cli.mjs` with secret-shield preflight + prompt-shield wrap. Capture the child CLI's stdout verbatim as the review.

**Multi-bg-agent / Agent team:** see [`references/parallel-execution.md`](references/parallel-execution.md) — fan out one persona per agent with shared scope, collect each agent's findings, merge into one three-tier report with persona tags.

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
2. Persona: load `references/personas/adversarial.md` (single-select).
3. Mode: in-process (single persona, default).
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
<input>"all four reviews on src/auth/" — multi-persona</input>
<output>
1. Scope: read every file under `src/auth/`.
2. Personas: user picked "All four" — load all four persona refs.
3. Mode: host is Claude Code, so recommend **agent team**. User accepts; load `references/parallel-execution.md`.
4. Resolve scope once, then spawn 4 agents (one per persona) in a single message with `team_name` set. Each agent gets the persona body + scope + output-format spec inlined. Wait for all four. Merge findings: dedupe by `(file, line, normalized-message)`, regroup by severity, tag with persona.
5. Output one combined three-tier report headed `# Code review — agent-team (4 personas)`.
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
in-process; cross-model and parallel-execution refs stayed unloaded.
</good>

<bad>
Pre-loaded all four persona references, `cross-model-handoff.md`, and
`parallel-execution.md` "just in case". Wastes context budget on every
dispatch.
</bad>

The bad example violates the skill's progressive-disclosure design — references exist precisely so we don't pay the context cost when they're not needed.

## Security

Cross-model mode forwards local file / diff content to a third-party AI CLI on the same machine. That crosses a trust boundary even though the source content is local: code under review can contain embedded secrets (API keys, tokens) and prompt-injection-style markers (intentionally or accidentally). Two complementary mitigations are built into `scripts/invoke-cli.mjs` and fire when the agent uses the `--instructions <file> --untrusted-content <file>` form.

**Credential exfiltration:** the script runs a regex-based secret scan on the content before composing the prompt. Default `--secret-mode scan` refuses to forward when any known secret format (AWS, GitHub, OpenAI, Anthropic, Slack, Stripe, Google API, JWT, PEM private keys) is detected. `--secret-mode redact` substitutes `[REDACTED-{type}-{n}]` placeholders. `--secret-mode allow` skips the check (use only when you've already audited the content). Source: [`scripts/secret-shield/`](scripts/secret-shield/).

**Prompt injection:** the script generates a fresh 12-hex salt per invocation and wraps the content in `<untrusted-{{salt}}>...</untrusted-{{salt}}>` with an anti-injection preamble before piping to the child CLI. Attacker-embedded closing tags (whether intentional or accidental) can't escape the wrap because they can't predict the salt. Source: [`scripts/prompt-shield/`](scripts/prompt-shield/).

In-process review, multi-bg-agent, and agent-team do not cross trust boundaries — they all run within the same agent harness on the local machine, no external sink, no preflight needed. Cross-model is the only mode where preflight applies. Background and threat model: [`contributing/prompt-injection.md`](../../contributing/prompt-injection.md).

## References

- [`references/personas/adversarial.md`](references/personas/adversarial.md) — harsh, devil's-advocate persona
- [`references/personas/security.md`](references/personas/security.md) — security-focused review lens
- [`references/personas/architecture.md`](references/personas/architecture.md) — design / coupling / modularity
- [`references/personas/performance.md`](references/personas/performance.md) — complexity, memory, I/O
- [`references/cross-model-handoff.md`](references/cross-model-handoff.md) — how to invoke detected CLIs
- [`references/parallel-execution.md`](references/parallel-execution.md) — multi-bg-agent + agent-team fan-out and merge
- [`references/review-output-format.md`](references/review-output-format.md) — three-tier output spec
- [`scripts/detect-clis.mjs`](scripts/detect-clis.mjs) — node script, ships with the skill, probes for ~20 AI CLIs and emits JSON
