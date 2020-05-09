import * as check from "../src";

test("check succeeds when all child checks succeed", () => {
  const checkValue = check.chain(
    check.string(),
    check.trim(),
    check.maxLength(6),
  );
  const result = checkValue("  jerome   ");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check succeeds when no checks are given", () => {
  const checkValue = check.chain();
  const result = checkValue("jerome");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check fails with error from first failing child check", () => {
  const checkValue = check.chain(
    check.string(),
    check.trim(),
    check.minLength(8),
    check.pattern(/[A-Z]/),
  );
  const result = checkValue("  jerome   ");

  expect(result).toEqual({
    isOk: false,
    error: "is too short",
    invalidValue: "jerome",
    path: [],
  });
});

test("additional arguments are passed to the child checks", () => {
  const checkValue = check.chain(
    (value, ...args) => check.ok(args),
    (value, ...args) => check.ok([value, args]),
  );
  const result = checkValue(null, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: [
      ["one", "two"],
      ["one", "two"],
    ],
  });
});
