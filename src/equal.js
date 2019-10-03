import test from "./test";

export default function equal(value, message = "is invalid") {
  return test(input => Object.is(input, value), message);
}
