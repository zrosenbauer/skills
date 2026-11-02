# Claude Code skills — reviewed documentation excerpts

Source: https://code.claude.com/docs/en/skills.md
Retrieved: 2026-11-01
Scope: local skills; selected excerpts, not a complete provider specification.

## Format and discovery

> Claude Code skills follow the Agent Skills open standard.

> Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit.

Personal skills live in `~/.claude/skills/<name>/SKILL.md`; project skills in
`.claude/skills/<name>/SKILL.md`. Plugins expose a `skills/` directory. An
arbitrary authoring `skills/` directory is not a native project discovery path.
Supporting files can be linked and loaded on demand; scripts are optional.

## Frontmatter

> All fields are optional. Only `description` is recommended so Claude knows when to use the skill.

The name defaults to the directory name. Portable distribution still requires
`name` and `description` under the Agent Skills baseline.
Documented fields include `argument-hint`, `arguments`, `when_to_use`,
`disable-model-invocation`, `user-invocable`, `allowed-tools`,
`disallowed-tools`, `model`, `effort`, `context`, `agent`, `background`,
`hooks`, `paths`, `shell`, `metadata`, `license`, and `compatibility`.
Claude accepts a metadata map but does not act on it. Invocation controls,
dynamic shell injection, substitutions, and tool permissions are provider
extensions, not portable execution guarantees. Available tools depend on the
host and its permissions; this snapshot is not an exhaustive tool catalog.
