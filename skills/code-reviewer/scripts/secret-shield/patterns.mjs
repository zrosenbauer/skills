/**
 * secret-shield/patterns — registry of known secret formats, scoped to
 * patterns with high signal and low false-positive rates.
 *
 * Each entry:
 *   - id: stable kebab-case identifier (used in redaction placeholders)
 *   - name: human-readable
 *   - pattern: RegExp source string (the `g` flag is added at scan time)
 *   - severity: "high" | "medium"
 *
 * Add new patterns here. Don't add generic "long entropy string" rules —
 * those produce too many false positives in code review.
 *
 * Sources:
 *   - GitHub token formats: https://github.blog/changelog/2021-03-31-authentication-token-format-updates/
 *   - AWS access key prefix: https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html
 *   - OpenAI key formats: https://platform.openai.com/docs/api-reference/authentication
 *   - Anthropic key format: https://docs.claude.com/en/api/authentication
 *
 * @typedef {object} SecretPattern
 * @property {string} id
 * @property {string} name
 * @property {string} pattern
 * @property {"high"|"medium"} severity
 */

/** @type {SecretPattern[]} */
export const PATTERNS = [
  {
    id: 'aws-access-key',
    name: 'AWS Access Key ID',
    pattern: 'AKIA[0-9A-Z]{16}',
    severity: 'high',
  },
  {
    id: 'github-pat-classic',
    name: 'GitHub Personal Access Token (classic)',
    pattern: 'ghp_[A-Za-z0-9]{36}',
    severity: 'high',
  },
  {
    id: 'github-pat-fine-grained',
    name: 'GitHub Fine-grained Personal Access Token',
    pattern: 'github_pat_[A-Za-z0-9_]{82}',
    severity: 'high',
  },
  {
    id: 'github-oauth',
    name: 'GitHub OAuth Token',
    pattern: 'gho_[A-Za-z0-9]{36}',
    severity: 'high',
  },
  {
    id: 'github-app-server',
    name: 'GitHub App Server-to-Server Token',
    pattern: 'ghs_[A-Za-z0-9]{36}',
    severity: 'high',
  },
  {
    id: 'github-app-user',
    name: 'GitHub App User-to-Server Token',
    pattern: 'ghu_[A-Za-z0-9]{36}',
    severity: 'high',
  },
  {
    id: 'github-refresh',
    name: 'GitHub Refresh Token',
    pattern: 'ghr_[A-Za-z0-9]{36}',
    severity: 'high',
  },
  {
    id: 'openai-legacy',
    name: 'OpenAI API Key (legacy)',
    pattern: 'sk-[A-Za-z0-9]{48}',
    severity: 'high',
  },
  {
    id: 'openai-project',
    name: 'OpenAI API Key (project-scoped)',
    pattern: 'sk-proj-[A-Za-z0-9_-]{40,}',
    severity: 'high',
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API Key',
    pattern: 'sk-ant-api[0-9]{2}-[A-Za-z0-9_-]{40,}',
    severity: 'high',
  },
  {
    id: 'slack-token',
    name: 'Slack Token',
    pattern: 'xox[abprs]-[0-9]+-[0-9]+(?:-[0-9]+)?-[A-Za-z0-9]+',
    severity: 'high',
  },
  {
    id: 'stripe-secret',
    name: 'Stripe Secret Key',
    pattern: '(?:sk|rk)_live_[A-Za-z0-9]{24,}',
    severity: 'high',
  },
  {
    id: 'google-api-key',
    name: 'Google API Key',
    pattern: 'AIza[A-Za-z0-9_-]{35}',
    severity: 'high',
  },
  {
    id: 'jwt',
    name: 'JSON Web Token',
    pattern: 'eyJ[A-Za-z0-9_-]{8,}\\.eyJ[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{5,}',
    severity: 'medium',
  },
  {
    id: 'private-key-block',
    name: 'PEM Private Key',
    pattern: '-----BEGIN (?:RSA |DSA |EC |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----',
    severity: 'high',
  },
]
