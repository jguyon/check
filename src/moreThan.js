import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function moreThan(min, message = "is too low") {
  invariant(
    _.isFinite(min) || isRef(min),
    failure(
      "moreThan",
      "expected `min` argument to be a valid number or a ref",
    ),
  );

  return withRefs(
    [min],
    test((value, min) => value > min, message),
  );
}
