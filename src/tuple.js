import _ from "lodash";
import invariant from "tiny-invariant";
import { isRef } from "./ref";
import { hasRefs } from "./withRefs";
import ok from "./ok";
import error from "./error";
import errors from "./errors";

export default function tuple(checks, lengthMessage) {
  invariant(_.isArray(checks), "expected checks argument to be an array");
  invariant(
    _.every(checks, _.isFunction),
    "expected checks argument to contain only functions",
  );

  if (lengthMessage === undefined) {
    lengthMessage = `does not have ${checks.length} items`;
  }

  const indices = _.range(0, checks.length);
  validateRefDeps(indices, checks);
  const sortedIndices = sortCheckIndices(indices, checks);

  return input => {
    if (input.length !== checks.length) {
      return error(input, lengthMessage);
    }

    const results = getResults(sortedIndices, checks, input);
    return getFinalResult(results);
  };
}

function validateRefDeps(indices, checks) {
  const hasBeenProcessed = {};

  _.forEach(indices, function processIndex(index, parentIndices = []) {
    if (!hasBeenProcessed[index]) {
      const check = checks[index];

      if (hasRefs(check)) {
        _.forEach(check.refs, ref => {
          invariant(
            ref.path.length > 0 &&
              !_.eq(index, ref.path[0]) &&
              !_.includes(parentIndices, ref.path[0]),
            "expected no circular dependencies in refs",
          );
          invariant(
            _.includes(indices, ref.path[0]),
            "expected ref to reference a valid path",
          );

          processIndex(ref.path[0], [index, ...parentIndices]);
        });
      }

      hasBeenProcessed[index] = true;
    }
  });
}

function sortCheckIndices(indices, checks) {
  const sortedIndices = [];
  const hasBeenProcessed = {};

  _.forEach(indices, function processIndex(index) {
    if (!hasBeenProcessed[index]) {
      const check = checks[index];

      if (hasRefs(check)) {
        _.forEach(check.refs, ref => {
          if (isRef(ref)) {
            processIndex(ref.path[0]);
          }
        });
      }

      sortedIndices.push(index);
      hasBeenProcessed[index] = true;
    }
  });

  return sortedIndices;
}

function getResults(indices, checks, input) {
  const results = new Array(indices.length);

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    const check = checks[index];

    if (hasRefs(check)) {
      const refs = [];

      for (let j = 0; j < check.refs.length; j++) {
        const ref = check.refs[j];

        if (isRef(ref)) {
          const [refIndex, ...path] = ref.path;
          const result = results[refIndex];

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

      results[index] = check.check(input[index], refs);
    } else {
      results[index] = check(input[index]);
    }
  }

  return results;
}

function getFinalResult(results) {
  let isOk = true;
  const output = new Array(results.length);
  const errs = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    if (result.isOk) {
      output[i] = result.value;
    } else {
      isOk = false;
      for (let j = 0; j < result.errors.length; j++) {
        const { path, value, message } = result.errors[j];
        errs.push({
          path: [i, ...path],
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

// export default function tuple(checks, lengthMessage) {
//   invariant(_.isArray(checks), "expected checks argument to be an array");
//   invariant(
//     _.every(checks, _.isFunction),
//     "expected checks argument to contain only functions",
//   );

//   if (lengthMessage === undefined) {
//     lengthMessage = `does not have ${checks.length} items`;
//   }

//   return input => {
//     if (input.length !== checks.length) {
//       return error(input, lengthMessage);
//     }

//     let isOk = true;
//     const output = [];
//     const errs = [];

//     for (let i = 0; i < checks.length; i++) {
//       const result = checks[i](input[i]);

//       if (result.isOk) {
//         output.push(result.value);
//       } else {
//         isOk = false;
//         for (let j = 0; j < result.errors.length; j++) {
//           const { path, value, message } = result.errors[j];
//           errs.push({
//             path: [i, ...path],
//             value,
//             message,
//           });
//         }
//       }
//     }

//     if (isOk) {
//       return ok(output);
//     } else {
//       return errors(errs);
//     }
//   };
// }
