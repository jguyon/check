import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that converts the given value into a number.
 *
 * ```js
 * const check = toNumber();
 *
 * check("42");
 * // => {
 * //   isOk: true,
 * //   value: 42,
 * // }
 *
 * check("asdf");
 * // => {
 * //   isOk: true,
 * //   value: NaN,
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function toNumber(): Check<unknown, number> {
  return transform((value) => Number(value));
}
