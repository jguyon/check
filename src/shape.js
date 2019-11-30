import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import errors from "./errors";

export default function shape(checks) {
  invariant(_.isObjectLike(checks), "expected checks argument to be an object");

  const keys = _.keys(checks);

  invariant(
    _.every(keys, key => _.isFunction(checks[key])),
    "expected checks argument to contain only functions",
  );

  return (input, ...parents) => {
    let isOk = true;
    const output = {};
    const errs = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = checks[key](input[key], input, ...parents);

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
