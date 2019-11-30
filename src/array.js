import _ from "lodash";
import test from "./test";

export default function array(message = "is not an array") {
  return test(value => _.isArray(value), message);
}
