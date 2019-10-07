import _ from "lodash";
import invariant from "tiny-invariant";
import withRefs, { hasRefs } from "./withRefs";
import ok from "./ok";

export default function pipe(...checks) {
  invariant(
    _.every(checks, _.isFunction),
    "expected all arguments to be functions",
  );

  const refs = getRefsFromChecks(checks);

  return withRefs(refs, (value, refs) => {
    let output = value;
    let refI = 0;

    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];

      let result;
      if (hasRefs(check)) {
        const checkRefs = _.slice(refs, refI, refI + check.refs.length);
        refI += check.refs.length;
        result = check.check(output, checkRefs);
      } else {
        result = check(output);
      }

      if (result.isOk) {
        output = result.value;
      } else {
        return result;
      }
    }

    return ok(output);
  });
}

function getRefsFromChecks(checks) {
  const refArrays = _.map(checks, check => (hasRefs(check) ? check.refs : []));
  return _.flatten(refArrays);
}
