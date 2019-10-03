import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function association(check) {
  invariant(_.isFunction(check), "expected check argument to be a function");

  return input => {
    const output = {};
    const keys = _.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = check(input[key]);

      if (result.isOk) {
        output[key] = result.value;
      } else {
        return error(result.message, [key, ...result.path]);
      }
    }

    return ok(output);
  };
}
