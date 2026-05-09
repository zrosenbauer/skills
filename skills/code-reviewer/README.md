# code-reviewer

> Review code in the current working tree through a chosen reviewer persona — adversarial, security, architecture, or performance.

Reviews local files, `git diff`, or `git diff --staged` only. The skill picks one of four reviewer references on demand (progressive disclosure) so the dispatch surface stays small.

## Install

```bash
npx skills add zrosenbauer/skills --skill code-reviewer
```

## What it does

- Asks the user which review angle (adversarial / security / architecture / performance), loads only that reference
- Reads the in-scope files / diff from the local working tree
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

## Out of scope

- Reviewing pull requests from external repos / contributors. Run that inside a trusted CI environment after vetting the source.
- Cross-model handoff to other AI CLIs. The skill is local + in-process by design.

## License

[MIT](./LICENSE) © Zac Rosenbauer
