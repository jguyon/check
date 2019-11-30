import _ from "lodash";
import transform from "./transform";

export default function toUpperCase() {
  return transform(value => _.toUpper(value));
}
