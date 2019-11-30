import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function maxLength(max, message = "is too long") {
  invariant(
    _.isFinite(max) || isRef(max),
    "expected max argument to be a valid number or a ref",
  );

  return withRefs([max], test((value, max) => value.length <= max, message));
}
