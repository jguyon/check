import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function max(max, message = "is too high") {
  invariant(
    isRef(max) || _.isFinite(max),
    "expected max argument to be a valid number",
  );

  return withRefs(
    [max],
    test((value, [max]) => !max.isOk || value <= max.value, message),
  );
}
