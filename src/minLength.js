import _ from "lodash";
import invariant from "tiny-invariant";
import test from "./test";

export default function minLength(min, message = "is too short") {
  invariant(_.isFinite(min), "expected min argument to be a valid number");

  return test(value => value.length >= min, message);
}
