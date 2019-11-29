import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";

export default function optional(check) {
  invariant(_.isFunction(check), "expected check argument to be a function");

  return (value, ...parents) => {
    if (_.isNil(value)) {
      return ok(null);
    } else {
      return check(value, ...parents);
    }
  };
}
