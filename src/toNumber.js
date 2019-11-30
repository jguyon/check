import _ from "lodash";
import transform from "./transform";

export default function toNumber() {
  return transform(value => _.toNumber(value));
}
