import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";

export default function optional(check) {
  invariant(
    _.isFunction(check),
    failure("optional", "expected `check` argument to be a function"),
  );

  return (value, ...parents) => {
    if (_.isNil(value)) {
      return ok(null);
    } else {
      return check(value, ...parents);
    }
  };
}
