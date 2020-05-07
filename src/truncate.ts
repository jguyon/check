import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that transforms a number into its integer part.
 *
 * ```js
 * const check = truncate();
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
 * //   value: -3,
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function truncate(): Check<number> {
  return transform((value) =>
    value < 0 ? Math.ceil(value) : Math.floor(value),
  );
}
