import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that converts a string to lower case.
 *
 * ```js
 * const check = toLower();
 *
 * check("JEROME");
 * // => {
 * //   isOk: true,
 * //   value: "jerome",
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function toLower(): Check<string> {
  return transform((value) => value.toLowerCase());
}
