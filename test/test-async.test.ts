import * as check from "../src";

test("check succeeds when given predicate succeeds", async () => {
  const checkValue = check.testAsync(async () => true);
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check fails when given predicate fails", async () => {
  const checkValue = check.testAsync(async () => false);
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: [],
  });
});

test("given predicate is called with the value to validate", async () => {
  const predicate = jest.fn(async () => true);
  const checkValue = check.testAsync(predicate);
  await checkValue(42);

  expect(predicate).toHaveBeenCalledTimes(1);
  expect(predicate).toHaveBeenCalledWith(42);
});

test("given predicate is called with the additional arguments", async () => {
  const predicate = jest.fn(async () => true);
  const checkValue = check.testAsync<unknown, unknown[]>(predicate);
  await checkValue(42, "one", "two");

  expect(predicate).toHaveBeenCalledTimes(1);
  expect(predicate).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("given error is returned with the invalid result", async () => {
  const checkValue = check.testAsync(async () => false, "is wrong");
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 42,
    path: [],
  });
});

test("given path and invalid value are returned with the invalid result", async () => {
  const checkValue = check.testAsync(
    async () => false,
    "is invalid",
    ["value"],
    () => "invalid value",
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid value",
    path: ["value"],
  });
});

test("given function to get the invalid value is called with the validated value", async () => {
  const getInvalidValue = jest.fn(() => "invalid value");
  const checkValue = check.testAsync(
    async () => false,
    "is invalid",
    ["value"],
    getInvalidValue,
  );
  await checkValue(42);

  expect(getInvalidValue).toHaveBeenCalledTimes(1);
  expect(getInvalidValue).toHaveBeenCalledWith(42);
});

test("given function to get the invalid value is called with the additional arguments", async () => {
  const getInvalidValue = jest.fn(() => "invalid value");
  const checkValue = check.testAsync<unknown, unknown[]>(
    async () => false,
    "is invalid",
    ["value"],
    getInvalidValue,
  );
  await checkValue(42, "one", "two");

  expect(getInvalidValue).toHaveBeenCalledTimes(1);
  expect(getInvalidValue).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("synchronous predicates are handled", async () => {
  const checkValue = check.testAsync(() => true);
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});
