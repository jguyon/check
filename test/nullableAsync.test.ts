import * as check from "../src";

test("check succeeds when given value is not null and child check succeeds", async () => {
  const checkValue = check.nullableAsync(async () => check.ok("value"));

  for (const value of ["jerome", "", 42, 0, undefined]) {
    const result = await checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value: "value",
    });
  }
});

test("check fails when given value is not null and child check fails", async () => {
  const checkValue = check.nullableAsync(async () =>
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

test("check succeeds when given value is null", async () => {
  const checkValue = check.nullableAsync(async () =>
    check.error("value", "is wrong"),
  );
  const result = await checkValue(null);

  expect(result).toEqual({
    isOk: true,
    value: null,
  });
});

test("child check is called with given value", async () => {
  const checkChild = jest.fn(async () => check.ok("value"));
  const checkValue = check.nullableAsync(checkChild);
  await checkValue(42);

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(42);
});

test("child check is called with the additional arguments", async () => {
  const checkChild = jest.fn(async () => check.ok("value"));
  const checkValue = check.nullableAsync<unknown, unknown, unknown[]>(
    checkChild,
  );
  await checkValue(42, "one", "two");

  expect(checkChild).toHaveBeenCalledTimes(1);
  expect(checkChild).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("child check is not called when given value is null", async () => {
  const checkChild = jest.fn(async () => check.ok("value"));
  const checkValue = check.nullableAsync(checkChild);
  await checkValue(null);

  expect(checkChild).not.toHaveBeenCalled();
});

test("synchronous child checks are handled", async () => {
  const checkValue = check.nullableAsync(() => check.ok("value"));
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: "value",
  });
});
