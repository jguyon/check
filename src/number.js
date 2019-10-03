import _ from "lodash";
import test from "./test";

export default function number(message = "is not a number") {
  return test(_.isNumber, message);
}
