import _ from "lodash";
import withRefs from "./withRefs";
import test from "./test";

export default function notEqual(value, message = "is invalid") {
  return withRefs(
    [value],
    test((input, value) => !_.eq(input, value), message),
  );
}
