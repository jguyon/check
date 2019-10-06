import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function parseIntCheck(
  radix = 10,
  message = "is not a well formatted integer",
) {
  invariant(_.isInteger(radix), "expected radix argument to be an integer");

  return value => {
    const number = parseInt(value, radix);

    if (isNaN(number)) {
      return error(value, message);
    } else {
      return ok(number);
    }
  };
}
