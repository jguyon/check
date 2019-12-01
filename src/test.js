import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import error from "./error";

export default function test(test, message = "is invalid") {
  invariant(
    _.isFunction(test),
    failure("test", "expected `test` argument to be a function"),
  );

  return (value, ...parents) => {
    if (test(value, ...parents)) {
      return ok(value);
    } else {
      return error(value, message);
    }
  };
}
