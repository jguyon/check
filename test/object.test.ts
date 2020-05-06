import * as check from "../src";

test("check succeeds when given value is an object", () => {
  const checkValue = check.object();

  for (const value of [{ key: "value" }, {}, new Date(), ["value"]]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not an object", () => {
  const checkValue = check.object();

  for (const value of [null, undefined, true, 42, "value"]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not an object",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.object("is no obj");
  const result = checkValue("value");

  expect(result).toEqual({
    isOk: false,
    error: "is no obj",
    invalidValue: "value",
    path: [],
  });
});
