import test from "./test";

export default function pattern(regexp, message = "is invalid") {
  return test(value => regexp.test(value), message);
}
