import _ from "lodash";
import test from "./test";

export default function finite(message = "is not a finite number") {
  return test(value => _.isFinite(value), message);
}
