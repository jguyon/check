import * as check from "../src";

test("check succeeds when given value is an integer", () => {
  const checkValue = check.integer();

  for (const value of [42, 0, -42]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not an integer", () => {
  const checkValue = check.integer();

  for (const value of [Math.PI, "42", true]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not an integer",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.integer("is no int");
  const result = checkValue(Math.PI);

  expect(result).toEqual({
    isOk: false,
    error: "is no int",
    invalidValue: Math.PI,
    path: [],
  });
});
