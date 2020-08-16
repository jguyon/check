import * as check from "../src";

test("check succeeds when child check fails", () => {
  const checkValue = check.not(() => check.error("value", "is wrong"));
  const result = checkValue(43);

  expect(result).toEqual({
    isOk: true,
    value: 43,
  });
});

test("check fails when child check succeeds", () => {
  const checkValue = check.not(() => check.ok("value"));
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: [],
  });
});

test("child check is called with given value", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.not(checkChild);
  checkValue(42);

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(42);
});

test("child check is called with the additional arguments", () => {
  const checkChild = jest.fn(() => check.ok("value"));
  const checkValue = check.not<unknown, unknown[]>(checkChild);
  checkValue(42, "one", "two");

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.not(() => check.ok("value"), "is wrong");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 42,
    path: [],
  });
});

test("given path and invalid value are returned with the invalid result", () => {
  const checkValue = check.not(
    () => check.ok("value"),
    "is invalid",
    ["value"],
    () => "invalid value",
  );
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid value",
    path: ["value"],
  });
});

test("given function to get the invalid value is called with the validated value", () => {
  const getInvalidValue = jest.fn(() => "invalid value");
  const checkValue = check.not(
    () => check.ok("value"),
    "is invalid",
    ["value"],
    getInvalidValue,
  );
  checkValue(42);

  expect(getInvalidValue).toHaveBeenCalledTimes(1);
  expect(getInvalidValue).toHaveBeenCalledWith(42);
});

test("given function to get the invalid value is called with the additional arguments", () => {
  const getInvalidValue = jest.fn(() => "invalid value");
  const checkValue = check.not<unknown, unknown[]>(
    () => check.ok("value"),
    "is invalid",
    ["value"],
    getInvalidValue,
  );
  checkValue(42, "one", "two");

  expect(getInvalidValue).toHaveBeenCalledTimes(1);
  expect(getInvalidValue).toHaveBeenCalledWith(expect.anything(), "one", "two");
});
