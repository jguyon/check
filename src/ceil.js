import _ from "lodash";
import transform from "./transform";

export default function ceil() {
  return transform(value => _.ceil(value));
}
