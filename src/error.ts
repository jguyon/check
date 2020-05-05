/**
 * An invalid result.
 */
export interface ErrorResult {
  isOk: false;

  /**
   * The error associated with the invalid value.
   */
  error: string;

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
 * ```js
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
 * ```js
 * error("value", "is invalid", ["one", "two"]);
 * // => {
 * //   isOk: false,
 * //   error: "is invalid",
 * //   invalidValue: "value",
 * //   path: ["one", "two"],
 * // }
 * ```
 *
 * @param invalidValue The invalid value that led to the error.
 * @param error The error associated with the invalid value.
 * @param path The keys that lead to the invalid value from the parent object.
 * @returns An invalid result.
 */
export default function error(
  invalidValue: unknown,
  error: string,
  path: unknown[] = [],
): ErrorResult {
  return {
    isOk: false,
    error,
    invalidValue,
    path,
  };
}
