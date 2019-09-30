import invariant from "tiny-invariant";
import ok from "./ok";

export default function pipe(...checks) {
  invariant(
    checks.every(check => typeof check === "function"),
    "expected all arguments to be functions",
  );

  if (checks.length === 0) {
    return ok;
  } else {
    return checks.reduceRight((nextCheck, currCheck) => value => {
      const result = currCheck(value);

      if (result.isOk) {
        return nextCheck(result.value);
      } else {
        return result;
      }
    });
  }
}
