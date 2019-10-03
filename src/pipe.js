import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";

export default function pipe(...checks) {
  invariant(
    _.every(checks, _.isFunction),
    "expected all arguments to be functions",
  );

  if (checks.length === 0) {
    return ok;
  } else {
    return _.reduceRight(checks, (nextCheck, currCheck) => value => {
      const result = currCheck(value);

      if (result.isOk) {
        return nextCheck(result.value);
      } else {
        return result;
      }
    });
  }
}
