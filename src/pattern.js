import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import test from "./test";

export default function pattern(regexp, message = "is invalid") {
  invariant(
    _.isRegExp(regexp),
    failure("pattern", "expected `regexp` argument to be a regular expression"),
  );

  return test(value => regexp.test(value), message);
}
