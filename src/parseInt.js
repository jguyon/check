import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import error from "./error";

/**
 * Creates a check function that tries to parse a string into an integer.
 *
 * @name parseInt
 * @param {number} radix an integer representing the base used to parse the
 * number
 * @param {any} message an error message used when the string could not be
 * parsed
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.parseInt();
 *
 * check("123"); // => { isOk: true, value: 123 }
 * check("abc"); // => { isOk: false, ... }
 */
export default function parseIntCheck(
  radix = 10,
  message = "is not a well formatted integer",
) {
  invariant(
    _.isInteger(radix),
    failure("parseInt", "expected `radix` argument to be a valid integer"),
  );

  return value => {
    const number = parseInt(value, radix);

    if (isNaN(number)) {
      return error(value, message);
    } else {
      return ok(number);
    }
  };
}
