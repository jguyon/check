import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function test(fn, message = "is invalid") {
  invariant(_.isFunction(fn), "expected fn argument to be a function");

  return (value, ...parents) => {
    if (fn(value, ...parents)) {
      return ok(value);
    } else {
      return error(value, message);
    }
  };
}
