import * as check from "../src";

test("check succeeds when given value is NaN", () => {
  const checkValue = check.NaN();

  for (const value of [NaN, new Date("asdf"), "asdf"]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not NaN", () => {
  const checkValue = check.NaN();

  for (const value of [42, new Date(), "42"]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not NaN",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.NaN("is no nan");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is no nan",
    invalidValue: 42,
    path: [],
  });
});
