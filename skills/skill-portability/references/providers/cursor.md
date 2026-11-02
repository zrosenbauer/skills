# Cursor Agent Skills — reviewed documentation excerpts

Source: https://cursor.com/docs/skills
Retrieved: 2026-11-01
Scope: Agent Skills, not the separate Cursor Rules format.

## Format and discovery

> Each skill should be a folder containing a `SKILL.md` file.

> Skills can also include optional directories for scripts, references, and assets.

Project locations: `.agents/skills/` and `.cursor/skills/`. User locations:
`~/.agents/skills/` and `~/.cursor/skills/`. Compatibility locations include
Claude and Codex skill directories. Nested skill directories are discovered.
Remote and cloud availability differs from local discovery; do not promise
that local skills automatically synchronize everywhere.

## Frontmatter

`name` and `description` are required. The name must match the parent folder
and use lowercase letters, numbers, and hyphens. Optional fields include
`paths`, `disable-model-invocation`, `icon`, `color`, and `metadata`.
`disable-model-invocation: true` requires explicit invocation. `paths` scopes
a skill to file globs; legacy `globs` is a fallback. `alwaysApply` is a Rules
field, not a documented Skills field. Rules `.mdc` files are not a required
conversion target for skills.

## Companion resources and limits

References and scripts use relative paths from the skill root. The docs do
not establish an exhaustive tool-name catalog or say XML examples are stripped.
An unfamiliar tool name is an adaptation condition, not proof that an equivalent
capability is absent. Ordinary Markdown examples need no format rewrite.
