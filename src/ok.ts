/**
 * A valid result.
 *
 * @param T The type of the wrapped value.
 */
export interface OkResult<T> {
  isOk: true;

  /**
   * The valid value.
   */
  value: T;
}

/**
 * Creates a valid result.
 *
 * ```typescript
 * check.ok("value");
 * // => {
 * //   isOk: true,
 * //   value: "value",
 * // }
 * ```
 *
 * @typeparam T The type of the wrapped value.
 * @param value The valid value to wrap.
 * @returns A valid result.
 */
export default function ok<T>(value: T): OkResult<T> {
  return {
    isOk: true,
    value,
  };
}
