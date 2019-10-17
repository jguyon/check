import _ from "lodash";
import invariant from "tiny-invariant";

const IS_REF = {};

export default function ref(path, transform = _.identity) {
  invariant(_.isArray(path), "expected path argument to be an array");
  invariant(
    _.isFunction(transform),
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
