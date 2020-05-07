import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that rounds a number down to the previous integer.
 *
 * ```js
 * const check = floor();
 *
 * check(3.14);
 * // => {
 * //   isOk: true,
 * //   value: 3,
 * // }
 *
 * check(-3.14);
 * // => {
 * //   isOk: true,
 * //   value: -4,
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function floor(): Check<number> {
  return transform((value) => Math.floor(value));
}
