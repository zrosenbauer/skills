// Thin wrapper around the official `validate-npm-package-name` package.
// We previously hand-ported the rules; the upstream package is the source
// of truth and stays in sync with npm itself.

import validate from 'validate-npm-package-name'

/**
 * @typedef {Object} ValidateResult
 * @property {boolean} isValid - true only if the name is valid for NEW publishes
 * @property {string[]} reasons - human-readable rejection reasons; empty when valid
 * @property {boolean} isScoped - true if the name is in the `@scope/name` form
 */

/**
 * Validate an npm package name. Combines errors and warnings into a single
 * reasons[] array because for *new* publishes both are blockers.
 *
 * @param {unknown} name
 * @returns {ValidateResult}
 * @example
 * validateName('tiny-log')      // { isValid: true,  reasons: [], isScoped: false }
 * validateName('TinyLog')       // { isValid: false, reasons: ['…capital letters'], isScoped: false }
 * validateName('@me/.foo')      // { isValid: false, reasons: ['…period'], isScoped: true }
 */
export function validateName(name) {
  if (typeof name !== 'string') {
    return { isValid: false, reasons: ['name must be a string'], isScoped: false }
  }
  const result = validate(name)
  const reasons = [...(result.errors ?? []), ...(result.warnings ?? [])]
  const isScoped = name.startsWith('@') && name.includes('/')
  return { isValid: Boolean(result.validForNewPackages), reasons, isScoped }
}
