import _ from "lodash";
import invariant from "tiny-invariant";

let id = Math.random();

export default function createSymbol(name) {
  invariant(_.isString(name), "expected `name` argument to be a string");

  if (typeof Symbol === "function") {
    return Symbol(`check.${name}`);
  } else {
    const uid = `JGuyonCheckSymbol(check.${name})_${(id++).toString(36)}`;
    return { toString: () => uid };
  }
}
