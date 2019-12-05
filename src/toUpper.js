import _ from "lodash";
import transform from "./transform";

export default function toUpper() {
  return transform(value => _.toUpper(value));
}
