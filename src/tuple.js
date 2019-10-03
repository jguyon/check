import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function tuple(checks, lengthMessage) {
  invariant(_.isArray(checks), "expected checks argument to be an array");
  invariant(
    _.every(checks, _.isFunction),
    "expected checks argument to contain only functions",
  );

  if (lengthMessage === undefined) {
    lengthMessage = `does not have ${checks.length} items`;
  }

  return input => {
    if (input.length !== checks.length) {
      return error(lengthMessage);
    }

    const output = [];

    for (let i = 0; i < checks.length; i++) {
      const result = checks[i](input[i]);

      if (result.isOk) {
        output.push(result.value);
      } else {
        return error(result.message, [i, ...result.path]);
      }
    }

    return ok(output);
  };
}
