import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function minLength(min, message = "is too short") {
  invariant(
    isRef(min) || _.isFinite(min),
    "expected min argument to be a valid number or a ref",
  );

  return withRefs(
    [min],
    test((value, [min]) => !min.isOk || value.length >= min.value, message),
  );
}
