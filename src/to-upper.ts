import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that converts a string to upper case.
 *
 * ```js
 * const check = toUpper();
 *
 * check("jerome");
 * // => {
 * //   isOk: true,
 * //   value: "JEROME",
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function toUpper(): Check<string> {
  return transform((value) => value.toUpperCase());
}
