import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that converts the given value into a string.
 *
 * ```js
 * const check = toString();
 *
 * check(42);
 * // => {
 * //   isOk: true,
 * //   value: "42",
 * // }
 *
 * check(null);
 * // => {
 * //   isOk: true,
 * //   value: "",
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function toString(): Check<unknown, string> {
  return transform((value) => (value == null ? "" : String(value)));
}
