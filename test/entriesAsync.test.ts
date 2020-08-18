import * as check from "../src";

test("check succeeds when child checks succeeds on all key-value pairs", async () => {
  const checkValue = check.entriesAsync(
    check.chainAsync(
      check.transformAsync(async (value) => value.trim()),
      check.pattern(/^[0-9]+$/),
    ),
    check.chainAsync(
      check.string(),
      check.transformAsync(async (value) => value.trim()),
    ),
  );
  const result = await checkValue({
    " 1  ": "   one ",
    "  2": "  two    ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      1: "one",
      2: "two",
    },
  });
});

test("check fails when child key check fails on at least one key", async () => {
  const checkValue = check.entriesAsync(
    check.testAsync(async (value) => value === "one", "is invalid"),
    async (value) => check.ok(value),
  );
  const result = await checkValue({ one: 1, two: 2 });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: [],
  });
});

test("check fails when child value check fails on at least one value", async () => {
  const checkValue = check.entriesAsync(
    async (value) => check.ok(value),
    check.testAsync(async (value) => value === "one", "is invalid"),
  );
  const result = await checkValue({ 1: "one", 2: "two" });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: ["2"],
  });
});

test("child checks are called with all key-value pairs", async () => {
  const checkKey = jest.fn(async () => check.ok("key"));
  const checkValue = jest.fn(async () => check.ok("value"));
  const checkEntries = check.entriesAsync(checkKey, checkValue);
  await checkEntries({
    one: 1,
    two: 2,
  });

  expect(checkKey).toHaveBeenCalledTimes(2);
  expect(checkKey).toHaveBeenCalledWith("one");
  expect(checkKey).toHaveBeenCalledWith("two");
  expect(checkValue).toHaveBeenCalledTimes(2);
  expect(checkValue).toHaveBeenCalledWith(1);
  expect(checkValue).toHaveBeenCalledWith(2);
});

test("child checks are called with the additional arguments", async () => {
  const checkKey = jest.fn(async () => check.ok("key"));
  const checkValue = jest.fn(async () => check.ok("value"));
  const checkEntries = check.entriesAsync<unknown, unknown, unknown[]>(
    checkKey,
    checkValue,
  );
  await checkEntries(
    {
      one: 1,
      two: 2,
    },
    "one",
    "two",
  );

  expect(checkKey).toHaveBeenCalledTimes(2);
  expect(checkKey).toHaveBeenNthCalledWith(1, expect.anything(), "one", "two");
  expect(checkKey).toHaveBeenNthCalledWith(2, expect.anything(), "one", "two");
  expect(checkValue).toHaveBeenCalledTimes(2);
  expect(checkValue).toHaveBeenNthCalledWith(
    1,
    expect.anything(),
    "one",
    "two",
  );
  expect(checkValue).toHaveBeenNthCalledWith(
    2,
    expect.anything(),
    "one",
    "two",
  );
});

test("correct path is returned with the value error", async () => {
  const checkValue = check.entriesAsync(
    check.transformAsync(async (value) => value.trim()),
    async () => check.error("invalid", "is wrong", ["two"]),
  );
  const result = await checkValue({
    " one  ": 1,
  });

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "invalid",
    path: [" one  ", "two"],
  });
});

test("synchronous child checks are handled", async () => {
  const checkValue = check.entriesAsync(
    () => check.ok("key"),
    () => check.ok("value"),
  );
  const result = await checkValue({
    one: 1,
    two: 2,
  });

  expect(result).toEqual({
    isOk: true,
    value: { key: "value" },
  });
});
