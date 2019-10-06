import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import ok from "./ok";

const HAS_REFS = {};

export default function withRefs(refs, check) {
  invariant(_.isArray(refs), "expected refs argument to be an array");
  invariant(_.isFunction(check), "expected check argument to be a function");

  if (_.every(refs, ref => !isRef(ref))) {
    const results = _.map(refs, ok);
    return value => check(value, results);
  } else {
    const checkWithRefs = () => {
      invariant(false, "cannot call a check with unresolved refs");
    };

    checkWithRefs[HAS_REFS] = true;
    checkWithRefs.refs = refs;
    checkWithRefs.check = check;

    return checkWithRefs;
  }
}

export function hasRefs(check) {
  return _.isFunction(check) && !!check[HAS_REFS];
}
