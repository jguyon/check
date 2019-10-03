import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function association(check) {
  invariant(
    typeof check === "function",
    "expected check argument to be a function",
  );

  return input => {
    const output = {};

    for (const key of Object.keys(input)) {
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
