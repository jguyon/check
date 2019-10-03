import _ from "lodash";
import transform from "./transform";

export default function toLowerCase() {
  return transform(_.toLower);
}
