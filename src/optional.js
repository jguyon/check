import _ from "lodash";
import invariant from "tiny-invariant";
import withRefs, { hasRefs } from "./withRefs";
import ok from "./ok";

export default function optional(check) {
  invariant(_.isFunction(check), "expected check argument to be a function");

  return withRefs(hasRefs(check) ? check.refs : [], (value, refs) => {
    if (_.isNil(value)) {
      return ok(null);
    } else if (hasRefs(check)) {
      return check.check(value, refs);
    } else {
      return check(value);
    }
  });
}
