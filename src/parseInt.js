import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import error from "./error";

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
