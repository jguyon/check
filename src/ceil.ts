import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that rounds a number up to the next integer.
 *
 * ```js
 * const check = ceil();
 *
 * check(3.14);
 * // => {
 * //   isOk: true,
 * //   value: 4,
 * // }
 *
 * check(-3.14);
 * // => {
 * //   isOk: true,
 * //   value: -3,
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function ceil(): Check<number> {
  return transform((value) => Math.ceil(value));
}
