# Frontmatter schema

Every `SKILL.md` in this monorepo starts with a YAML frontmatter block. The skills here aim to be **agent-agnostic** — runnable on any agent that respects the [skills.sh](https://skills.sh) `SKILL.md` spec (Claude Code, Cursor, Codex, OpenCode, etc.).

## Universal core (required)

| Field         | Type                        | Notes                                                                                                                                    |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | string                      | The skill identifier — must match the directory name (kebab-case). Required by the [`skills` CLI](https://www.npmjs.com/package/skills). |
| `description` | string (folded scalar `>-`) | 80–1024 chars. See [description.md](description.md).                                                                                     |

Both fields are required by the `skills` CLI for installation. `name` must match the directory name exactly.

## Claude Code extensions (optional)

These fields are read by Claude Code per the [official spec](https://code.claude.com/docs/en/skills.md). Other agents safely ignore them — keep them defensively for cross-agent compatibility.

| Field                      | Type    | Notes                                                                                                                                   |
| -------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `argument-hint`            | string  | Hint shown during autocomplete to indicate expected arguments, e.g. `'[<skill-name>]'`. Use `''` when the skill takes no arguments.     |
| `user-invocable`           | boolean | When `false`, hides the skill from the `/` slash-command menu (Claude can still invoke it). Defaults to `true`.                         |
| `disable-model-invocation` | boolean | When `true`, prevents Claude from auto-loading the skill — only the user can invoke via `/`. Defaults to `false` (model can auto-load). |
| `allowed-tools`            | string  | Space-separated tools Claude can use without asking permission when this skill is active, e.g. `'Bash(git:*) Read Edit'`.               |

**Fields that look like they should exist but don't:** there is no `model-invocable` or `metadata` field in Claude Code's spec. Use `disable-model-invocation` (inverse semantics) instead of `model-invocable`. There is no first-class metadata bag — author/version/tags belong in the description body or `README.md`.

## License

| Field     | Type   | Notes                                                                                      |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| `license` | string | SPDX identifier (`MIT`, `Apache-2.0`, etc.) if not inheriting from repo root. Cross-agent. |

## Canonical example

```yaml
---
name: refactor-to-functional
description: >-
  This skill should be used when the user wants to refactor TypeScript code
  to functional patterns. Common triggers include "make this functional",
  "remove the class", and "use Result instead of throw". Bakes in factory
  functions over classes and Result<T,E> over exceptions. Skip when working
  with framework-required classes.

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<file-path>]'
user-invocable: true
# Optional, defaults to false:
# disable-model-invocation: true  # set true to prevent Claude from auto-loading
---
```

## Notes

- Use the YAML folded scalar `>-` for the description so it can wrap across lines without inserting newlines.
- Keep frontmatter minimal. Don't add fields no agent will use.
- Don't quote field names. YAML doesn't require it.
- Single-quote string values that contain colons or special chars (`'[<skill-name>]'`).
- The Claude Code extensions are harmless to other agents — include them defensively.
