import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function collection(check) {
  invariant(
    typeof check === "function",
    "expected check argument to be a function",
  );

  return input => {
    const output = [];

    for (let i = 0; i < input.length; i++) {
      const result = check(input[i]);

      if (result.isOk) {
        output.push(result.value);
      } else {
        return error(result.message, [i, ...result.path]);
      }
    }

    return ok(output);
  };
}
