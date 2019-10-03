import _ from "lodash";
import invariant from "tiny-invariant";
import test from "./test";

export default function maxLength(max, message = "is too long") {
  invariant(_.isFinite(max), "expected max argument to be a valid number");

  return test(value => value.length <= max, message);
}
