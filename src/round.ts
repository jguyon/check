import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that rounds a number to the nearest integer.
 *
 * ```js
 * const check = round();
 *
 * check(3.14);
 * // => {
 * //   isOk: true,
 * //   value: 3,
 * // }
 *
 * check(3.86);
 * // => {
 * //   isOk: true,
 * //   value: 4,
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function round(): Check<number> {
  return transform((value) => Math.round(value));
}
