import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import errors from "./errors";

export default function collection(check) {
  invariant(
    _.isFunction(check),
    failure("collection", "expected `check` argument to be a function"),
  );

  return (input, ...parents) => {
    let isOk = true;
    const output = new Array(input.length);
    const errs = [];

    for (let i = 0; i < input.length; i++) {
      const result = check(input[i], input, ...parents);

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
