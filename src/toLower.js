import _ from "lodash";
import transform from "./transform";

export default function toLower() {
  return transform(value => _.toLower(value));
}
