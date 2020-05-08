import * as check from "../src";

test("check succeeds when given value matches pattern", () => {
  const checkValue = check.pattern(/[a-z]/);
  const result = checkValue("abc");

  expect(result).toEqual({
    isOk: true,
    value: "abc",
  });
});

test("check fails when given value does not match pattern", () => {
  const checkValue = check.pattern(/[a-z]/);
  const result = checkValue("ABC");

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "ABC",
    path: [],
  });
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.pattern(
    /[a-z]/,
    "does not contain a lower case letter",
  );
  const result = checkValue("ABC");

  expect(result).toEqual({
    isOk: false,
    error: "does not contain a lower case letter",
    invalidValue: "ABC",
    path: [],
  });
});
