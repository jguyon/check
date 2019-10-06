import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";
import errors from "./errors";

export default function collection(check) {
  invariant(_.isFunction(check), "expected check argument to be a function");

  return input => {
    let isOk = true;
    const output = [];
    const errs = [];

    for (let i = 0; i < input.length; i++) {
      const result = check(input[i]);

      if (result.isOk) {
        output.push(result.value);
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
