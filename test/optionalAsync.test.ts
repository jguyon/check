import * as check from "../src";

test("check succeeds when given value is present and child check succeeds", async () => {
  const checkValue = check.optionalAsync(async () => check.ok("value"));

  for (const value of ["jerome", "", 42, 0, null]) {
    const result = await checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value: "value",
    });
  }
});

test("check fails when given value is present and child check fails", async () => {
  const checkValue = check.optionalAsync(async () =>
    check.error("value", "is wrong"),
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "value",
    path: [],
  });
});

test("check succeeds when given value is not present", async () => {
  const checkValue = check.optionalAsync(async () =>
    check.error("value", "is wrong"),
  );
  const result = await checkValue(undefined);

  expect(result).toEqual({
    isOk: true,
    value: undefined,
  });
});

test("child check is called with given value", async () => {
  const checkChild = jest.fn(async () => check.ok("value"));
  const checkValue = check.optionalAsync(checkChild);
  await checkValue(42);

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(42);
});

test("child check is called with the additional arguments", async () => {
  const checkChild = jest.fn(async () => check.ok("value"));
  const checkValue = check.optionalAsync<unknown, unknown, unknown[]>(
    checkChild,
  );
  await checkValue(42, "one", "two");

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("child check is not called when given value is not present", async () => {
  const checkChild = jest.fn(async () => check.ok("value"));
  const checkValue = check.optionalAsync(checkChild);
  await checkValue(undefined);

  expect(checkChild).not.toHaveBeenCalled();
});
