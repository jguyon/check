import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import errors from "./errors";

export default function error(value, message, path = []) {
  invariant(
    _.isArray(path),
    failure("error", "expected `path` argument to be an array"),
  );
  invariant(
    arguments.length >= 2,
    failure(
      "error",
      "expected `value` and `message` arguments to be specified",
    ),
  );

  return errors([
    {
      path,
      value,
      message,
    },
  ]);
}
