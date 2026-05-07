/**
 * Result<T, E> — explicit error handling without throwing.
 *
 * Mirrors the convention from `skills/functional-ts-best-practices`. Use for
 * expected failure modes (parsing, schema validation, file I/O); reserve
 * `throw` for programming bugs / truly exceptional conditions.
 */
export interface Ok<T> {
  readonly ok: true
  readonly value: T
}

export interface Err<E> {
  readonly ok: false
  readonly error: E
}

export type Result<T, E = Error> = Ok<T> | Err<E>

/**
 * Wrap a successful value.
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}

/**
 * Wrap an error.
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}

/**
 * Type guard that narrows a Result to its Ok branch.
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok === true
}

/**
 * Type guard that narrows a Result to its Err branch.
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.ok === false
}

/**
 * Run a synchronous function that may throw, capture the outcome as a Result.
 *
 * @example
 * ```ts
 * const parsed = attempt(() => JSON.parse(raw))
 * if (!parsed.ok) return logger.warn({ err: parsed.error }, 'bad json')
 * useConfig(parsed.value)
 * ```
 */
export function attempt<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn())
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)))
  }
}

/**
 * Async version of `attempt`. Returns a Promise<Result<T, Error>>.
 */
export async function attemptAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
  try {
    return ok(await fn())
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)))
  }
}
