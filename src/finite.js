import _ from "lodash";
import test from "./test";

export default function finite(message = "is not a finite number") {
  return test(_.isFinite, message);
}
