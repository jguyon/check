import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that converts a string to upper case.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.toUpper();
 *
 * check("jerome"); // => { isOk: true, value: "JEROME" }
 */
export default function toUpper() {
  return transform(value => _.toUpper(value));
}
