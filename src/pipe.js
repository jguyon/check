import ok from "./ok";

export default function pipe(...checks) {
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
