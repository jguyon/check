import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";

export default function oneOf(...checks) {
  invariant(
    checks.length > 0,
    failure("oneOf", "expected at least one argument"),
  );
  invariant(
    _.every(checks, _.isFunction),
    failure("oneOf", "expected all arguments to be functions"),
  );

  return (...args) => {
    let i = 0;

    for (; i < checks.length - 1; i++) {
      const result = checks[i](...args);

      if (result.isOk) {
        return result;
      }
    }

    return checks[i](...args);
  };
}
