# code-reviewer

> Review code in the current working tree through a chosen reviewer persona — adversarial, security, architecture, or performance. Optionally hand the review off to another AI CLI on the local machine for an independent cross-model second opinion.

Reviews local files, `git diff`, or `git diff --staged` only — never fetches external content. Default mode is in-process; cross-model handoff is opt-in.

## Install

```bash
npx skills add zrosenbauer/skills --skill code-reviewer
```

## What it does

- Asks the user which review angle (adversarial / security / architecture / performance), loads only that reference (progressive disclosure)
- Reads the in-scope files / diff from the local working tree
- If the user asks for a "second opinion via <cli>", probes `$PATH` for ~20 known AI CLIs and offers a cross-model handoff (Codex, Gemini, Aider, Cursor agent, Crush, Mods, Ollama, Goose, Continue, Windsurf, Droid, Tabnine, Amp, Qwen Code, iFlow, Kimi, aichat, gh copilot, etc.)
- Outputs findings in three-tier severity (error / warn / info) matching the repo's `skill-tools` lint format

## Personas

| Persona      | When to use                                                             | Reference                                                                    |
| ------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Adversarial  | Default for "harsh review", devil's advocate, before-merge sanity check | [`references/adversarial-reviewer.md`](references/adversarial-reviewer.md)   |
| Security     | Threat-model the code; OWASP / CWE categories                           | [`references/security-reviewer.md`](references/security-reviewer.md)         |
| Architecture | Boundaries, coupling, change locality, dependency direction             | [`references/architecture-reviewer.md`](references/architecture-reviewer.md) |
| Performance  | Algorithmic complexity, I/O patterns, GC pressure                       | [`references/performance-reviewer.md`](references/performance-reviewer.md)   |

## Trigger phrases

- "review this code"
- "audit this diff"
- "find issues in this"
- "second opinion on this"
- "harsh review of"
- "adversarial review"
- "security review of"

## Cross-model handoff (opt-in)

When the user explicitly asks for a second opinion via another CLI, the skill probes for available AI CLIs:

```bash
node scripts/detect-clis.mjs --available-only --pretty
```

Then dispatches via `scripts/invoke-cli.mjs`, which runs a **secret-shield preflight** (refuses to forward known secret formats by default) and **prompt-shield salted-tag wrap** (anti-injection delimiter) before invoking the chosen CLI. See [`references/cross-model-handoff.md`](references/cross-model-handoff.md) for the full invocation pattern.

## Out of scope

- Reviewing pull requests from external repos / contributors. Run that inside a trusted CI environment after vetting the source.

## License

[MIT](./LICENSE) © Zac Rosenbauer
