# Provider snapshot maintenance

Normal audits use the bundled snapshots without fetching provider documentation.
The optional URL health check makes HEAD requests; run it only when the user
requests staleness verification, not as a prerequisite for offline audits.

Maintainers refresh snapshots quarterly or after a provider changes its skill
format. In the authoring repository:

1. Read `skills/skill-portability/scripts/providers.mjs` for each provider's `docUrls`.
2. Check every URL; one healthy URL does not establish that all are current.
3. Fetch the official documentation and update the relevant snapshot under
   `skills/skill-portability/references/providers/`, including its retrieval date.
4. Reconcile the provider registry's fields with the snapshot; flag unresolved
   differences rather than guessing.
5. Run the repository's validation and commit registry and snapshots together.

Installed consumers should report stale references to the skill author rather
than overwrite their installed copies or fetch documentation mid-audit.
