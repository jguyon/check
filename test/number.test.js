import { number } from "../src";

test("check succeeds when given value is a number", () => {
  const check = number();
  const result = check(Math.PI);

  expect(result).toMatchObject({
    isOk: true,
    value: Math.PI,
  });
});

test("check fails when given value is not a number", () => {
  const check = number();
  const result = check("42");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is not a number",
  });
});

test("given message is returned with the error", () => {
  const check = number("is not a numbery number");
  const result = check("42");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is not a numbery number",
  });
});
