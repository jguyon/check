/**
 * An invalid result.
 *
 * @param E The type of the wrapped error.
 */
export interface ErrorResult<E = string> {
  isOk: false;

  /**
   * The error associated with the invalid value.
   */
  error: E;

  /**
   * The invalid value that led to the error.
   */
  invalidValue: unknown;

  /**
   * The keys that lead to the invalid value from the parent object.
   */
  path: Array<unknown>;
}

/**
 * Creates an invalid result.
 *
 * Without a path:
 * ```typescript
 * error("value", "is invalid");
 * // => {
 * //   isOk: false,
 * //   error: "is invalid",
 * //   invalidValue: "value",
 * //   path: [],
 * // }
 * ```
 *
 * With a path:
 * ```typescript
 * error("value", "is invalid", ["one", "two"]);
 * // => {
 * //   isOk: false,
 * //   error: "is invalid",
 * //   invalidValue: "value",
 * //   path: ["one", "two"],
 * // }
 * ```
 *
 * @typeparam E The type of the wrapped error.
 * @param invalidValue The invalid value that led to the error.
 * @param error The error associated with the invalid value.
 * @param path The keys that lead to the invalid value from the parent object.
 * @returns An invalid result.
 */
export default function error<E>(
  invalidValue: unknown,
  error: E,
  path: unknown[] = [],
): ErrorResult<E> {
  return {
    isOk: false,
    error,
    invalidValue,
    path,
  };
}
