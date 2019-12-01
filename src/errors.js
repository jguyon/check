import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";

export default function errors(errors) {
  invariant(
    _.isArray(errors),
    failure("errors", "expected `errors` argument to be an array"),
  );

  return {
    isOk: false,
    errors,
  };
}
