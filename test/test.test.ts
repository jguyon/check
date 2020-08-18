import * as check from "../src";

test("check succeeds when given predicate succeeds", () => {
  const checkValue = check.test(() => true);
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check fails when given predicate fails", () => {
  const checkValue = check.test(() => false);
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: [],
  });
});

test("given predicate is called with the value to validate", () => {
  const predicate = jest.fn(() => true);
  const checkValue = check.test(predicate);
  checkValue(42);

  expect(predicate).toHaveBeenCalledTimes(1);
  expect(predicate).toHaveBeenCalledWith(42);
});

test("given predicate is called with the additional arguments", () => {
  const predicate = jest.fn(() => true);
  const checkValue = check.test<unknown, unknown[]>(predicate);
  checkValue(42, "one", "two");

  expect(predicate).toHaveBeenCalledTimes(1);
  expect(predicate).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.test(() => false, "is wrong");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 42,
    path: [],
  });
});

test("given path and invalid value are returned with the invalid result", () => {
  const checkValue = check.test(
    () => false,
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
  const checkValue = check.test(
    () => false,
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
  const checkValue = check.test<unknown, unknown[]>(
    () => false,
    "is invalid",
    ["value"],
    getInvalidValue,
  );
  checkValue(42, "one", "two");

  expect(getInvalidValue).toHaveBeenCalledTimes(1);
  expect(getInvalidValue).toHaveBeenCalledWith(expect.anything(), "one", "two");
});
