import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that converts the given value into a boolean.
 *
 * ```js
 * const check = toBoolean();
 *
 * check(1);
 * // => {
 * //   isOk: true,
 * //   value: true,
 * // }
 *
 * check(0);
 * // => {
 * //   isOk: true,
 * //   value: false,
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function toBoolean(): Check<unknown, boolean> {
  return transform((value) => Boolean(value));
}
