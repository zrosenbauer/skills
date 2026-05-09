# secret-shield

Detect and (optionally) redact known secret formats in untrusted content before forwarding to a third-party LLM. Mitigates W007 (insecure credential handling).

## Why this exists

`prompt-shield` handles W011 (indirect prompt injection) by wrapping content in salted XML tags so the model treats it as data. That doesn't help with W007 — secrets embedded in the wrapped block still leave your trust boundary verbatim. `secret-shield` is the complement: it inspects the content itself.

The two helpers compose:

```
[content from gh pr diff]
   ↓ secret-shield --redact     (W007 mitigation: scrub credentials)
[redacted content]
   ↓ prompt-shield wrap         (W011 mitigation: anti-injection delimiters)
[final prompt → external CLI]
```

## Surface

| File                | Purpose                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `patterns.mjs`      | Curated regex registry (AWS, GitHub, OpenAI, Anthropic, Slack, Stripe, Google, JWT, PEM private keys) |
| `scan.mjs`          | `scanForSecrets({ content })` and `redactSecrets({ content })` — pure functions                       |
| `secret-shield.mjs` | Standalone CLI — `--scan` (report + exit code) or `--redact` (rewrite to stdout)                      |
| `*.test.mjs`        | Tests (live here only — not vendored into consuming skills)                                           |

## Detection philosophy

**Precision over recall.** Every pattern in `patterns.mjs` matches a documented, prefixed format (e.g. `AKIA...`, `ghp_...`, `sk-ant-api03-...`) with low false-positive rate. No entropy heuristics, no LLM judges. We'd rather miss an obscure custom token than block on a base64 string that happens to look like one.

If you find a missing format, add it to `patterns.mjs` with a citation and a test in `scan.test.mjs`.

## Consuming this from a skill

Add to your skill's manifest:

```json
// skills/<your-skill>/scripts.json
{ "scripts": ["prompt-shield", "secret-shield"] }
```

Vendor it in:

```bash
pnpm skill-tools sync-scripts
```

Two consumption patterns:

```js
// 1. Import from the vendored copy (JS-ful skills)
import { scanForSecrets, redactSecrets } from './secret-shield/scan.mjs'

const { findings, hasFindings } = scanForSecrets({ content: diff })
if (hasFindings) {
  // refuse, or:
  const { content: scrubbed } = redactSecrets({ content: diff })
  // forward `scrubbed` instead
}
```

```bash
# 2. Shell out to the CLI (markdown-only skills)
node ./scripts/secret-shield/secret-shield.mjs --scan diff.txt   # exit 1 on findings
node ./scripts/secret-shield/secret-shield.mjs --redact diff.txt # write redacted to stdout
```

## Don't edit the vendored copies

Source of truth is `skill-scripts/secret-shield/`. Vendored copies under `skills/<skill>/scripts/secret-shield/` are derived; the Lefthook pre-commit hook re-syncs them when source changes, and `pnpm skill-tools sync-scripts --check` fails CI on drift.

## Background

See [`contributing/prompt-injection.md`](../../contributing/prompt-injection.md) for the full threat model.
