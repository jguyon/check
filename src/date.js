import _ from "lodash";
import test from "./test";

export default function date(message = "is not a date") {
  return test(value => _.isDate(value), message);
}
