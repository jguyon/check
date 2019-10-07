import _ from "lodash";
import invariant from "tiny-invariant";
import { hasRefs } from "./withRefs";
import { isRef } from "./ref";
import ok from "./ok";

export default function checkWithRefs(check, input, ...refResults) {
  invariant(hasRefs(check), "expected check argument to have unresolved refs");

  const results = _.map(check.refs, ref => {
    if (isRef(ref)) {
      const item = _.find(refResults, ({ path }) =>
        _.every(path, (key, i) => key === ref.path[i]),
      );

      invariant(
        item,
        `expected a ref result with path ${JSON.stringify(ref.path)}`,
      );

      if (item.result.isOk && ref.transform) {
        return ok(ref.transform(item.result.value));
      } else {
        return item.result;
      }
    } else {
      return ok(ref);
    }
  });

  return check.check(input, results);
}
