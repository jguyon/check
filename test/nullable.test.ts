import * as check from "../src";

test("check succeeds when given value is not null and child check succeeds", () => {
  const checkValue = check.nullable(() => check.ok("value"));

  for (const value of ["jerome", "", 42, 0, undefined]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value: "value",
    });
  }
});

test("check fails when given value is not null and child check fails", () => {
  const checkValue = check.nullable(() => check.error("value", "is wrong"));
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "value",
    path: [],
  });
});

test("check succeeds when given value is null", () => {
  const checkValue = check.nullable(() => check.error("value", "is wrong"));
  const result = checkValue(null);

  expect(result).toEqual({
    isOk: true,
    value: null,
  });
});

test("child check is called with given value", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.nullable(checkChild);
  checkValue(42);

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(42);
});

test("child check is called with the additional arguments", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.nullable<unknown, unknown, unknown[]>(checkChild);
  checkValue(42, "one", "two");

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("child check is not called when given value is null", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.nullable(checkChild);
  checkValue(null);

  expect(checkChild).not.toHaveBeenCalled();
});
