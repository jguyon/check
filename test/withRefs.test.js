import { ref, withRefs, hasRefs, ok } from "../src";

test("regular check is not recognized as having refs", () => {
  const check = value => ok(value);

  expect(hasRefs(check)).toBe(false);
});

test("check with refs is created when given at least one ref", () => {
  const refs = [ref(["key"]), "value"];
  const check = () => {};
  const checkWithRefs = withRefs(refs, check);

  expect(hasRefs(checkWithRefs)).toBe(true);
  expect(checkWithRefs.refs).toBe(refs);
  expect(checkWithRefs.check).toBe(check);
});

test("regular check is created when given only regular values", () => {
  const check = withRefs([42], (value, [fortyTwo]) => {
    return ok([value, fortyTwo]);
  });
  const result = check("value");

  expect(hasRefs(check)).toBe(false);
  expect(result).toEqual({
    isOk: true,
    value: [
      "value",
      {
        isOk: true,
        value: 42,
      },
    ],
  });
});
