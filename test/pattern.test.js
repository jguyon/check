import { pattern } from "../src";

test("check succeeds when given value matches pattern", () => {
  const check = pattern(/[a-z]/);
  const result = check("abc");

  expect(result).toEqual({
    isOk: true,
    value: "abc",
  });
});

test("check fails when given value does not match pattern", () => {
  const check = pattern(/[a-z]/);
  const result = check("ABC");

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is invalid",
  });
});

test("given message is returned with the error", () => {
  const check = pattern(/[a-z]/, "does not contain a lowercase letter");
  const result = check("ABC");

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "does not contain a lowercase letter",
  });
});
