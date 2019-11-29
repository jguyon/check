import _ from "lodash";
import invariant from "tiny-invariant";
import createSymbol from "./create-symbol";
import ok from "./ok";
import errors from "./errors";
import up from "./up";

const IS_REF = createSymbol("IS_REF");
const GET_REF = createSymbol("GET_REF");

export default function ref(path, check = ok, keepErrors = false) {
  invariant(_.isArray(path), "expected path argument to be an array");
  invariant(_.isFunction(check), "expected check argument to be a function");
  invariant(
    _.isBoolean(keepErrors),
    "expected keepErrors argument to be a boolean",
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
    "expected path argument to contain up keys only at its start",
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
