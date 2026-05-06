# Frontmatter schema

Every `SKILL.md` in this monorepo starts with a YAML frontmatter block.

## Required fields

| Field | Type | Notes |
|---|---|---|
| `description` | string (folded scalar `>-`) | 80–1024 chars. See [description.md](description.md). |
| `argument-hint` | string | Single-line hint shown in slash-command picker, e.g., `'[<skill-name>]'`. Use `''` if no args. |
| `user-invocable` | boolean | `true` if invokable as `/<skill-name>`. Almost always `true`. |
| `model-invocable` | boolean | `true` if the model can invoke it via the dispatcher. Almost always `true`. |

## Optional fields

| Field | Type | Notes |
|---|---|---|
| `name` | string | The skill name. Inferred from directory name; only set if it must differ. |
| `license` | string | SPDX identifier (`MIT`, `Apache-2.0`, etc.) if not inheriting from repo root. |
| `metadata.author` | string | Override the default author (this repo: Zac Rosenbauer). |
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
- Keep frontmatter minimal. Don't add fields the dispatcher won't use.
- Don't quote field names. YAML doesn't require it.
- Single-quote string values that contain colons or special chars (`'[<skill-name>]'`).
