import { number } from "../src";

test("check succeeds when given value is a number", () => {
  const check = number();
  const result = check(Math.PI);

  expect(result).toEqual({
    isOk: true,
    value: Math.PI,
  });
});

test("check fails when given value is not a number", () => {
  const check = number();
  const result = check("42");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "42",
        message: "is not a number",
      },
    ],
  });
});

test("given message is returned with the error", () => {
  const check = number("is not a numbery number");
  const result = check("42");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "42",
        message: "is not a numbery number",
      },
    ],
  });
});
