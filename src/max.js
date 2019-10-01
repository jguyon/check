import invariant from "tiny-invariant";
import test from "./test";

export default function max(max, message = "is too high") {
  invariant(typeof max === "number", "expected max argument to be a number");

  return test(value => value <= max, message);
}
