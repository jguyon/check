import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import createSymbol from "./create-symbol";
import ok from "./ok";
import errors from "./errors";
import up from "./up";

/**
 * A reference to a value located in a parent object.
 *
 * @typedef {Object} Ref
 */

const IS_REF = createSymbol("IS_REF");
const GET_REF = createSymbol("GET_REF");

/**
 * Creates a reference to a value located in a parent object.
 *
 * The ref references the value before any sibling check functions have been
 * applied.
 *
 * You can give a check function if you need to validate or transform the value
 * before using it.
 *
 * @param {Array} path an array of keys leading to the referenced value
 * @param {Function} check a check function to apply to the referenced value
 * @param {boolean} keepErrors whether or not to keep the errors given by the
 * check function
 * @returns {Ref} a ref object
 *
 * @example
 * const check = C.shape({
 *   password: C.string(),
 *   passwordConfirmation: C.equal(C.ref(["password"])),
 * });
 *
 * check({
 *   password: "abcd",
 *   passwordConfirmation: "abcd",
 * }); // => { isOk: true, ... }
 * check({
 *   password: "abcd",
 *   passwordConfirmation: "dcba",
 * }); // => { isOk: false, ... }
 *
 * @example
 * const check = C.shape({
 *   email: C.pipe(
 *     C.string(),
 *     C.trim(),
 *   ),
 *   emailConfirmation: C.pipe(
 *     C.string(),
 *     C.trim(),
 *     C.equal(
 *       C.ref(
 *         ["email"],
 *         C.pipe(
 *           C.string(),
 *           C.trim(),
 *         ),
 *       ),
 *     ),
 *   ),
 * });
 *
 * check({
 *   email: "   john@doe.com ",
 *   emailConfirmation: " john@doe.com    ",
 * }); // => { isOk: true, ... }
 */
export default function ref(path, check = ok, keepErrors = false) {
  invariant(
    _.isArray(path),
    failure("ref", "expected `path` argument to be an array"),
  );
  invariant(
    _.isFunction(check),
    failure("ref", "expected `check` argument to be a function"),
  );
  invariant(
    _.isBoolean(keepErrors),
    failure("ref", "expected `keepErrors` argument to be a boolean"),
  );

  const { parentI, realPath } = processPath(path);
  const mapErrors = makeMapErrors(path, keepErrors);

  function getRefValue(parents) {
    let value = parents[parentI];

    for (let i = 0; i < realPath.length; i++) {
      if (_.isNil(value)) {
        value = undefined;
      } else {
        value = value[realPath[i]];
      }
    }

    const result = check(value);

    if (result.isOk) {
      return result;
    } else {
      return errors(mapErrors(result.errors));
    }
  }

  return {
    [IS_REF]: true,
    [GET_REF]: getRefValue,
  };
}

function processPath(path) {
  let parentI = 0;

  while (path[parentI] === up) {
    parentI++;
  }

  const realPath = path.slice(parentI);

  invariant(
    _.every(realPath, key => key !== up),
    failure(
      "ref",
      "expected `path` argument to contain up keys only at its start",
    ),
  );

  return {
    parentI,
    realPath,
  };
}

function makeMapErrors(path, keepErrors) {
  if (keepErrors) {
    const mapError = error => ({
      path: [up, ...path, ...error.path],
      value: error.value,
      message: error.message,
    });

    return errors => _.map(errors, mapError);
  } else {
    return () => [];
  }
}

export function isRef(maybeRef) {
  return _.isObjectLike(maybeRef) && maybeRef[IS_REF];
}

export function getRef(ref, parents) {
  return ref[GET_REF](parents);
}
