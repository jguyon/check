import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import error from "./error";
import errors from "./errors";

export default function tuple(checks, lengthMessage) {
  invariant(
    _.isArray(checks),
    failure("tuple", "expected `checks` argument to be an array"),
  );
  invariant(
    _.every(checks, _.isFunction),
    failure("tuple", "expected `checks` argument to contain only functions"),
  );

  if (lengthMessage === undefined) {
    lengthMessage = `does not have ${checks.length} items`;
  }

  return (input, ...parents) => {
    if (input.length !== checks.length) {
      return error(input, lengthMessage);
    }

    let isOk = true;
    const output = new Array(checks.length);
    const errs = [];

    for (let i = 0; i < checks.length; i++) {
      const result = checks[i](input[i], input, ...parents);

      if (result.isOk) {
        output[i] = result.value;
      } else {
        isOk = false;
        for (let j = 0; j < result.errors.length; j++) {
          const { path, value, message } = result.errors[j];
          errs.push({
            path: [i, ...path],
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
