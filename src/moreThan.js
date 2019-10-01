import invariant from "tiny-invariant";
import test from "./test";

export default function moreThan(min, message = "is too low") {
  invariant(typeof min === "number", "expected min argument to be a number");

  return test(value => value > min, message);
}
