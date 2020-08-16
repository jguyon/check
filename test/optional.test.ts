import * as check from "../src";

test("check succeeds when given value is present and child check succeeds", () => {
  const checkValue = check.optional(() => check.ok("value"));

  for (const value of ["jerome", "", 42, 0, null]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value: "value",
    });
  }
});

test("check fails when given value is present and child check fails", () => {
  const checkValue = check.optional(() => check.error("value", "is wrong"));
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "value",
    path: [],
  });
});

test("check succeeds when given value is not present", () => {
  const checkValue = check.optional(() => check.error("value", "is wrong"));
  const result = checkValue(undefined);

  expect(result).toEqual({
    isOk: true,
    value: undefined,
  });
});

test("child check is called with given value", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.optional(checkChild);
  checkValue(42);

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(42);
});

test("child check is called with the additional arguments", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.optional<unknown, unknown, unknown[]>(checkChild);
  checkValue(42, "one", "two");

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("child check is not called when given value is not present", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.optional(checkChild);
  checkValue(undefined);

  expect(checkChild).not.toHaveBeenCalled();
});
