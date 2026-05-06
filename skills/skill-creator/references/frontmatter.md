# Frontmatter schema

Every `SKILL.md` in this monorepo starts with a YAML frontmatter block. The skills here aim to be **agent-agnostic** — runnable on any agent that respects the [skills.sh](https://skills.sh) `SKILL.md` spec (Claude Code, Cursor, Codex, OpenCode, etc.).

## Universal core (required)

| Field | Type | Notes |
|---|---|---|
| `description` | string (folded scalar `>-`) | 80–1024 chars. See [description.md](description.md). The single field every agent reads. |

The `name` field is inferred from the directory name. Set it explicitly only if it must differ.

## Claude Code extensions (recommended, optional)

These fields are read by Claude Code. Other agents safely ignore them per the SKILL.md spec — keep them in for cross-agent compatibility without breaking anything elsewhere.

| Field | Type | Notes |
|---|---|---|
| `argument-hint` | string | Single-line hint shown in slash-command picker, e.g., `'[<skill-name>]'`. Use `''` if no args. |
| `user-invocable` | boolean | `true` if invokable as `/<skill-name>`. Almost always `true`. |
| `model-invocable` | boolean | `true` if the dispatcher can route to it automatically. Almost always `true`. |

## Optional metadata

| Field | Type | Notes |
|---|---|---|
| `name` | string | Override the inferred directory name. Rare. |
| `license` | string | SPDX identifier (`MIT`, `Apache-2.0`, etc.) if not inheriting from repo root. |
| `metadata.author` | string | Override the default author. |
| `metadata.version` | string | Semver, e.g., `"0.1.0"`. Optional. |
| `metadata.tags` | string | Space-separated tags for discovery. Optional. |

## Canonical example

```yaml
---
description: >-
  This skill should be used when the user wants to refactor TypeScript code
  to functional patterns. Common triggers include "make this functional",
  "remove the class", and "use Result instead of throw". Bakes in factory
  functions over classes and Result<T,E> over exceptions. Skip when working
  with framework-required classes.
argument-hint: '[<file-path>]'
user-invocable: true
model-invocable: true
---
```

## Notes

- Use the YAML folded scalar `>-` for the description so it can wrap across lines without inserting newlines.
- Keep frontmatter minimal. Don't add fields no agent will use.
- Don't quote field names. YAML doesn't require it.
- Single-quote string values that contain colons or special chars (`'[<skill-name>]'`).
- The Claude Code extensions are harmless to other agents — include them by default.
