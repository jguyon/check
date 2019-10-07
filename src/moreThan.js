import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function moreThan(min, message = "is too low") {
  invariant(
    isRef(min) || _.isFinite(min),
    "expected min argument to be a valid number",
  );

  return withRefs(
    [min],
    test((value, [min]) => !min.isOk || value > min.value, message),
  );
}
