import invariant from "tiny-invariant";
import errors from "./errors";

export default function error(value, message, path = []) {
  invariant(Array.isArray(path), "expected path argument to be an array");
  invariant(
    arguments.length >= 2,
    "expected actual and message arguments to be specified",
  );

  return errors([
    {
      path,
      value,
      message,
    },
  ]);
}
