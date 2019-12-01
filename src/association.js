import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import errors from "./errors";

export default function association(check) {
  invariant(
    _.isFunction(check),
    failure("association", "expected `check` argument to be a function"),
  );

  return (input, ...parents) => {
    let isOk = true;
    const output = {};
    const errs = [];
    const keys = _.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = check(input[key], input, ...parents);

      if (result.isOk) {
        output[key] = result.value;
      } else {
        isOk = false;
        for (let j = 0; j < result.errors.length; j++) {
          const { path, value, message } = result.errors[j];
          errs.push({
            path: [key, ...path],
            value,
            message,
          });
        }
      }
    }

    if (isOk) {
      return ok(output);
    } else {
      return errors(errs);
    }
  };
}
