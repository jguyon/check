import _ from "lodash";
import transform from "./transform";

export default function ceil() {
  return transform(_.ceil);
}
