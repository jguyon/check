import _ from "lodash";
import invariant from "tiny-invariant";
import test from "./test";

export default function max(max, message = "is too high") {
  invariant(_.isFinite(max), "expected max argument to be a valid number");

  return test(value => value <= max, message);
}
