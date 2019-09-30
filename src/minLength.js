import invariant from "tiny-invariant";
import test from "./test";

export default function minLength(min, message = "is too short") {
  invariant(typeof min === "number", "expected min argument to be a number");

  return test(value => value.length >= min, message);
}
