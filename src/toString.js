import _ from "lodash";
import transform from "./transform";

export default function toString() {
  return transform(value => _.toString(value));
}
