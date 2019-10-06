import _ from "lodash";
import invariant from "tiny-invariant";

const IS_REF = {};

export default function ref(path, transform) {
  invariant(_.isArray(path), "expected path argument to be an array");
  invariant(
    transform === undefined || _.isFunction(transform),
    "expected transform argument to be a function",
  );

  return {
    [IS_REF]: true,
    path,
    transform,
  };
}

export function isRef(ref) {
  return _.isObjectLike(ref) && !!ref[IS_REF];
}
