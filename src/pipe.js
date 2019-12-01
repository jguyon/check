import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";

export default function pipe(...checks) {
  invariant(
    _.every(checks, _.isFunction),
    failure("pipe", "expected all arguments to be functions"),
  );

  return (value, ...parents) => {
    let output = value;

    for (let i = 0; i < checks.length; i++) {
      const result = checks[i](output, ...parents);

      if (result.isOk) {
        output = result.value;
      } else {
        return result;
      }
    }

    return ok(output);
  };
}
