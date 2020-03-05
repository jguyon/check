import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import errors from "./errors";

/**
 * Creates an invalid result with one error.
 *
 * @param {any} value an invalid value
 * @param {any} message an error message
 * @param {Array} [path=[]] a sequence of keys leading to the invalid value
 * @returns {Object} an invalid result wrapping the error.
 *
 * @example
 * C.error(43, "is not the answer"); // => { isOk: false, errors: [ ... ] }
 */
export default function error(value, message, path = []) {
  invariant(
    _.isArray(path),
    failure("error", "expected `path` argument to be an array"),
  );
  invariant(
    arguments.length >= 2,
    failure(
      "error",
      "expected `value` and `message` arguments to be specified",
    ),
  );

  return errors([
    {
      path,
      value,
      message,
    },
  ]);
}
