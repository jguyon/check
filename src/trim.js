import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that trims a string.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.trim();
 *
 * check("  jerome   "); // => { isOk: true, value: "jerome" }
 */
export default function trim() {
  return transform(value => _.trim(value));
}
