import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function shape(checks) {
  invariant(
    checks !== null && typeof checks === "object",
    "expected checks argument to be an object",
  );

  const keys = Object.keys(checks);

  invariant(
    keys.map(key => checks[key]).every(check => typeof check === "function"),
    "expected checks argument to contain only functions",
  );

  return input => {
    const output = {};

    for (const key of keys) {
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
