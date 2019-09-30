import invariant from "tiny-invariant";
import test from "./test";

export default function pattern(regexp, message = "is invalid") {
  invariant(
    regexp instanceof RegExp,
    "expected regexp argument to be a regular expression",
  );

  return test(value => regexp.test(value), message);
}
