import * as check from "../src";

test("check succeeds when given value is not null and child check succeeds", () => {
  const checkValue = check.nullable(check.toString());

  for (const value of ["jerome", "", 42, 0, undefined]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value: value === undefined ? "" : String(value),
    });
  }
});

test("check fails when given value is not null and child check fails", () => {
  const checkValue = check.nullable(check.string());
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is not a string",
    invalidValue: 42,
    path: [],
  });
});

test("check succeeds when given value is null", () => {
  const checkValue = check.nullable(check.string());
  const result = checkValue(null);

  expect(result).toEqual({
    isOk: true,
    value: null,
  });
});

test("additional arguments are passed to the child check", () => {
  const checkValue = check.nullable((value, ...args) => check.ok(args));
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});
