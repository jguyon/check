import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef, getRef } from "./ref";

export default function withRefs(refs, check) {
  invariant(_.isArray(refs), "expected refs argument to be an array");
  invariant(_.isFunction(check), "expected check argument to be a function");

  if (_.every(refs, ref => !isRef(ref))) {
    return value => check(value, ...refs);
  } else {
    return (value, ...parents) => {
      const refValues = [];

      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];

        if (isRef(ref)) {
          const result = getRef(ref, parents);

          if (result.isOk) {
            refValues.push(result.value);
          } else {
            return result;
          }
        } else {
          refValues.push(ref);
        }
      }

      return check(value, ...refValues);
    };
  }
}
