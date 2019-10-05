import { string } from "../src";

test("check succeeds when given value is a string", () => {
  const check = string();
  const result = check("value");

  expect(result).toEqual({
    isOk: true,
    value: "value",
  });
});

test("check fails when given value is not a string", () => {
  const check = string();
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not a string",
  });
});

test("given message is returned with the error", () => {
  const check = string("is not a stringy string");
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not a stringy string",
  });
});
