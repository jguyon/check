import ok from "./ok";
import error from "./error";

/**
 * Creates a check function that tries to parse a string into a floating point
 * number.
 *
 * @name parseFloat
 * @param {any} message an error message used when the string could not be
 * parsed
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.parseFloat();
 *
 * check("3.14"); // => { isOk: true, value: 3.14 }
 * check("abc"); // => { isOk: false, ... }
 */
export default function parseFloatCheck(
  message = "is not a well formatted number",
) {
  return value => {
    const number = parseFloat(value);

    if (isNaN(number)) {
      return error(value, message);
    } else {
      return ok(number);
    }
  };
}
