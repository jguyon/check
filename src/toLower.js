import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that converts a string to lower case.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.toLower();
 *
 * check("JEROME"); // => { isOk: true, value: "jerome" }
 */
export default function toLower() {
  return transform(value => _.toLower(value));
}
