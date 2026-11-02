# Provider formats — interpretation notes

The registry in [providers.mjs](../scripts/providers.mjs) describes native Agent
Skills, not each provider's unrelated rules or repository-instruction mechanisms.
Use the bundled snapshots as dated evidence. Normal audits never fetch URLs;
[maintenance](maintenance.md) is an authoring-time operation.

## Shared format

Claude Code, Cursor, and Codex support SKILL.md directories and progressively
loaded companions. Require name and description for portable distribution, but
distinguish that baseline contract from permissive individual loaders. This
repository's trigger-count, description-length, and naming lint rules are
house conventions, not universal provider constraints.

## Claude Code

Local discovery uses .claude/skills/<name>/SKILL.md in the project and home
directory; plugin skills live in the plugin's skills/ directory. A repository
skills/ authoring directory is not automatically discovered without integration.
The native loader permits omitted name and description; portable distribution
does not. Current documented fields include metadata, license, compatibility,
paths, invocation controls, and other Claude-specific execution features.
Supporting Markdown and scripts can be loaded on demand. Do not assume dynamic
shell injection, substitutions, or allowed-tools grants transfer to other hosts.

## Cursor

Native Skills use SKILL.md with name and description, plus optional companions.
Project roots include .agents/skills/ and .cursor/skills/; corresponding user
locations and compatibility directories are documented in the snapshot.
The paths field scopes Skills; legacy globs is a fallback. The documented
optional fields include disable-model-invocation, icon, color, and metadata.
Rules .mdc files and alwaysApply are a separate feature, not a required skill
conversion. There is no evidence here that Cursor strips XML example tags or
cannot load references. Local discovery does not guarantee cloud synchronization.

## Codex

Native Skills require name and description in SKILL.md. Project discovery walks
.agents/skills from cwd up to the repository root; user skills live under
~/.agents/skills. References, scripts, and assets are supported. Optional
agents/openai.yaml supplies UI metadata, tool dependencies, and invocation policy:
policy.allow_implicit_invocation controls implicit activation. Do not assume
Claude-only frontmatter enforces manual invocation in Codex. AGENTS.md is a
separate repository-instruction mechanism, not a skill conversion target.

## Agent Skills baseline

The baseline specifies packaging and metadata, not a universal execution engine,
installation path, exhaustive tool catalog, or subagent API. A format pass alone
cannot establish that a workflow runs in every baseline-compatible agent. Report
host-dependent capabilities as unknown unless the actual host is specified.

## Capability and evidence rules

1. Registry tool names are illustrative and version-dependent, not complete lists.
2. Map capabilities such as file reading, asking a question, spawning a worker,
   and browser inspection to the actual harness; do not equate a spelling change
   with missing functionality.
3. Verify referenced resources exist and resolve relative to the installation.
4. Distinguish unsupported execution semantics from ordinary Markdown examples.
5. Missing or sparse evidence means unknown, not a model-memory guess.
6. Ignored invocation or permission fields never enforce a security boundary.
