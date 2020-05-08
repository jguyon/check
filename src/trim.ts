import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that trims a string.
 *
 * ```js
 * const check = trim();
 *
 * check("  jerome   ");
 * // => {
 * //   isOk: true,
 * //   value: "jerome",
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function trim(): Check<string> {
  return transform((value) => value.trim());
}
