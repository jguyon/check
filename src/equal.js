import _ from "lodash";
import withRefs from "./withRefs";
import test from "./test";

export default function equal(value, message = "is invalid") {
  return withRefs(
    [value],
    test(
      (input, [valueResult]) =>
        !valueResult.isOk || _.eq(input, valueResult.value),
      message,
    ),
  );
}
