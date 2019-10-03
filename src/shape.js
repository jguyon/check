import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function shape(checks) {
  invariant(_.isObjectLike(checks), "expected checks argument to be an object");

  const keys = _.keys(checks);

  invariant(
    _.every(keys, key => _.isFunction(checks[key])),
    "expected checks argument to contain only functions",
  );

  return input => {
    const output = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = checks[key](input[key]);

      if (result.isOk) {
        output[key] = result.value;
      } else {
        return error(result.message, [key, ...result.path]);
      }
    }

    return ok(output);
  };
}
