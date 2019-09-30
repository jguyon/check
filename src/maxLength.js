import invariant from "tiny-invariant";
import test from "./test";

export default function maxLength(max, message = "is too long") {
  invariant(typeof max === "number", "expected max argument to be a number");

  return test(value => value.length <= max, message);
}
