# Agent Skills baseline — reviewed specification excerpts

Source: https://agentskills.io/specification
Retrieved: 2026-11-01
Scope: portable packaging and metadata, not host-specific execution APIs.

## Directory and metadata

> A skill is a directory containing, at minimum, a `SKILL.md` file.

SKILL.md contains YAML frontmatter followed by Markdown. Required fields are
name and description. Name is 1–64 characters, lowercase alphanumeric and
hyphens, cannot start/end with a hyphen or contain consecutive hyphens, and
must match the parent directory. Description is non-empty and at most 1024
characters. The baseline does not require this repository's 80-character
minimum or three quoted trigger phrases.

Optional fields: license, compatibility (1–500 characters when supplied),
metadata (a string-to-string map), and experimental allowed-tools (a
space-separated string; support differs by implementation). Unknown extension
fields do not establish equivalent semantics across providers.

## Body and companions

> The Markdown body after the frontmatter contains the skill instructions.
> There are no format restrictions.

Recommended content includes step-by-step instructions, input/output examples,
and common edge cases. Optional scripts/, references/, assets/, and additional
files are permitted. Scripts should be self-contained or document dependencies,
provide useful errors, and handle edge cases. Supported languages depend on
the implementation. References should use paths relative to the skill root;
keep referenced material focused and avoid deeply nested reference chains.

## Progressive disclosure and limits

Metadata is loaded first; the complete SKILL.md body loads on activation;
additional resources load as needed. Keep the main body under 500 lines and
move detail to references. The specification describes packaging, not an
installation directory, tool-name catalog, subagent primitive, browser,
network permissions, or invocation-policy implementation. These require
actual host evidence; a format pass is not universal workflow compatibility.
