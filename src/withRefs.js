import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef, getRef } from "./ref";

/**
 * Creates a check function that uses refs.
 *
 * If a given ref is not a ref object, it will be given as is to the check
 * function.
 *
 * @param {Array} refs an array of values to get the references from
 * @param {Function} check a check function that takes the referenced values
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.shape({
 *   password: C.string(),
 *   passwordConfirmation: C.withRefs(
 *     [C.ref(["password"])],
 *     (value, password) =>
 *       value === password ?
 *         C.ok(value) :
 *         C.error(value, "does not match password"),
 *   ),
 * });
 */
export default function withRefs(refs, check) {
  invariant(
    _.isArray(refs),
    failure("withRefs", "expected `refs` argument to be an array"),
  );
  invariant(
    _.isFunction(check),
    failure("withRefs", "expected `check` argument to be a function"),
  );

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
