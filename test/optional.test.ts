import * as check from "../src";

test("check succeeds when given value is present and child check succeeds", () => {
  const checkValue = check.optional(check.trim());

  for (const value of ["jerome", ""]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is present and child check fails", () => {
  const checkValue = check.optional(check.string());
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is not a string",
    invalidValue: 42,
    path: [],
  });
});

test("check succeeds when given value is not present", () => {
  const checkValue = check.optional(check.string());
  const result = checkValue(undefined);

  expect(result).toEqual({
    isOk: true,
    value: undefined,
  });
});

test("additional arguments are passed to the child check", () => {
  const checkValue = check.optional((value, ...args) => check.ok(args));
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});
