import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function minLength(min, message = "is too short") {
  invariant(
    _.isInteger(min) || isRef(min),
    failure(
      "minLength",
      "expected `min` argument to be a valid integer or a ref",
    ),
  );

  return withRefs(
    [min],
    test((value, min) => value.length >= min, message),
  );
}
