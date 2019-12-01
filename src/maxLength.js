import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

export default function maxLength(max, message = "is too long") {
  invariant(
    _.isInteger(max) || isRef(max),
    failure(
      "maxLength",
      "expected `max` argument to be a valid integer or a ref",
    ),
  );

  return withRefs([max], test((value, max) => value.length <= max, message));
}
