import * as check from "../src";

test("check succeeds when given value is an array", () => {
  const checkValue = check.array();

  for (const value of [["value"], []]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not an object", () => {
  const checkValue = check.array();

  for (const value of [null, undefined, true, 42, "value", { length: 3 }]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not an array",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.array("is no arr");
  const result = checkValue("value");

  expect(result).toEqual({
    isOk: false,
    error: "is no arr",
    invalidValue: "value",
    path: [],
  });
});
