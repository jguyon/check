import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import { hasRefs } from "./withRefs";
import ok from "./ok";
import errors from "./errors";

export default function shape(checks) {
  invariant(_.isObjectLike(checks), "expected checks argument to be an object");

  const keys = _.keys(checks);

  invariant(
    _.every(keys, key => _.isFunction(checks[key])),
    "expected checks argument to contain only functions",
  );
  validateRefDeps(keys, checks);

  const sortedKeys = sortCheckKeys(keys, checks);

  return input => {
    const results = getResults(sortedKeys, checks, input);
    return getFinalResult(sortedKeys, results);
  };
}

function validateRefDeps(keys, checks) {
  const hasBeenProcessed = {};

  _.forEach(keys, function processKey(key, parentKeys = []) {
    if (!hasBeenProcessed[key]) {
      const check = checks[key];

      if (hasRefs(check)) {
        _.forEach(check.refs, ref => {
          invariant(
            ref.path.length > 0 &&
              !_.eq(key, ref.path[0]) &&
              !_.includes(parentKeys, ref.path[0]),
            "expected no circular dependencies in refs",
          );
          invariant(
            _.includes(keys, ref.path[0]),
            "expected ref to reference a valid path",
          );

          processKey(ref.path[0], [key, ...parentKeys]);
        });
      }

      hasBeenProcessed[key] = true;
    }
  });
}

function sortCheckKeys(keys, checks) {
  const sortedKeys = [];
  const hasBeenProcessed = {};

  _.forEach(keys, function processKey(key) {
    if (!hasBeenProcessed[key]) {
      const check = checks[key];

      if (hasRefs(check)) {
        _.forEach(check.refs, ref => {
          if (isRef(ref)) {
            processKey(ref.path[0]);
          }
        });
      }

      sortedKeys.push(key);
      hasBeenProcessed[key] = true;
    }
  });

  return sortedKeys;
}

function getResults(keys, checks, input) {
  const results = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const check = checks[key];

    if (hasRefs(check)) {
      const refs = [];

      for (let j = 0; j < check.refs.length; j++) {
        const ref = check.refs[j];

        if (isRef(ref)) {
          const [refKey, ...path] = ref.path;
          const result = results[refKey];

          if (result.isOk) {
            const value = ref.transform(
              path.length > 0 ? _.get(result.value, path) : result.value,
            );
            refs.push(ok(value));
          } else {
            refs.push(result);
          }
        } else {
          refs.push(ok(ref));
        }
      }

      results[key] = check.check(input[key], refs);
    } else {
      results[key] = check(input[key]);
    }
  }

  return results;
}

function getFinalResult(keys, results) {
  let isOk = true;
  const output = {};
  const errs = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const result = results[key];

    if (result.isOk) {
      output[key] = result.value;
    } else {
      isOk = false;
      for (let j = 0; j < result.errors.length; j++) {
        const { path, value, message } = result.errors[j];
        errs.push({
          path: [key, ...path],
          value,
          message,
        });
      }
    }
  }

  if (isOk) {
    return ok(output);
  } else {
    return errors(errs);
  }
}
