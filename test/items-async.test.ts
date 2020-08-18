import * as check from "../src";

test("check succeeds when child check succeeds on all items", async () => {
  const checkValue = check.itemsAsync(
    check.transformAsync(async (value: string) => value.trim()),
  );
  const result = await checkValue(["one", " two  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check fails when child check fails on at least one item", async () => {
  const checkValue = check.itemsAsync(
    check.testAsync(async (value) => value === "valid", "is invalid"),
  );
  const result = await checkValue(["valid", "invalid one", "invalid two"]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid one",
    path: [1],
  });
});

test("child check is called with all items", async () => {
  const checkItem = jest.fn(async () => check.ok(42));
  const checkValue = check.itemsAsync(checkItem);
  await checkValue([1, 2, 3]);

  expect(checkItem).toHaveBeenCalledTimes(3);
  expect(checkItem).toHaveBeenCalledWith(1);
  expect(checkItem).toHaveBeenCalledWith(2);
  expect(checkItem).toHaveBeenCalledWith(3);
});

test("child check is called with the additional arguments", async () => {
  const checkItem = jest.fn(async () => check.ok(42));
  const checkValue = check.itemsAsync<unknown, number, unknown[]>(checkItem);
  await checkValue([1, 2, 3], "one", "two");

  expect(checkItem).toHaveBeenCalledTimes(3);
  expect(checkItem).toHaveBeenNthCalledWith(1, expect.anything(), "one", "two");
  expect(checkItem).toHaveBeenNthCalledWith(2, expect.anything(), "one", "two");
  expect(checkItem).toHaveBeenNthCalledWith(3, expect.anything(), "one", "two");
});

test("correct path is returned with the error", async () => {
  const checkValue = check.itemsAsync(async (value) =>
    value === "valid" ? check.ok(value) : check.error(value, "is wrong", [2]),
  );
  const result = await checkValue(["valid", "invalid"]);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "invalid",
    path: [1, 2],
  });
});

test("synchronous child checks are handled", async () => {
  const checkValue = check.itemsAsync(check.trim());
  const result = await checkValue(["  one ", "two ", " three  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two", "three"],
  });
});
