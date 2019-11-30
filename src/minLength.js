import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function minLength(min, message = "is too short") {
  invariant(
    _.isFinite(min) || isRef(min),
    "expected min argument to be a valid number or a ref",
  );

  return withRefs([min], test((value, min) => value.length >= min, message));
}
