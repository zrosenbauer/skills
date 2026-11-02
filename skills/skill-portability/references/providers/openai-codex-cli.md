# Codex skills — reviewed documentation excerpts

Source: https://developers.openai.com/codex/skills/
Retrieved: 2026-11-01
Scope: local Codex skills, distinct from repository AGENTS.md instructions.

## Format and discovery

> A skill is a directory with a `SKILL.md` file plus optional scripts and references.
> The `SKILL.md` file must include `name` and `description`.

Codex uses progressive disclosure: it reads name and description first, then
the body when selected. Explicit invocation uses `/skills` or `$` mentions;
implicit activation matches the description.

> For repositories, Codex scans `.agents/skills` in every directory from your current working directory up to the repository root.

User skills live in `~/.agents/skills`; admin and bundled system locations
also exist. Symlinked skill folders are supported. An arbitrary authoring
`skills/` directory alone is not a native repository discovery location.

## Metadata and resources

Optional `agents/openai.yaml` configures UI metadata, invocation policy, and
tool dependencies. `policy.allow_implicit_invocation: false` disables implicit
activation while retaining explicit invocation. Do not assume Claude-specific
invocation fields enforce that policy in Codex. Supported resources include
`scripts/`, `references/`, and `assets/`.

AGENTS.md is a separate repository-instruction mechanism: renaming SKILL.md to
AGENTS.md is not required and changes its scope and activation semantics.
Tool names depend on version, sandbox, and host. This snapshot is not a complete
tool catalog and does not establish that XML examples are removed.
