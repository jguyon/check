import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";

export default function pipe(...checks) {
  invariant(
    _.every(checks, _.isFunction),
    "expected all arguments to be functions",
  );

  return value => {
    let output = value;

    for (let i = 0; i < checks.length; i++) {
      const result = checks[i](output);

      if (result.isOk) {
        output = result.value;
      } else {
        return result;
      }
    }

    return ok(output);
  };
}
