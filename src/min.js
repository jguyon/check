import _ from "lodash";
import invariant from "tiny-invariant";
import test from "./test";

export default function min(min, message = "is too low") {
  invariant(_.isFinite(min), "expected min argument to be a valid number");

  return test(value => value >= min, message);
}
