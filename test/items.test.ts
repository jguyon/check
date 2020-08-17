import * as check from "../src";

test("check succeeds when child check succeeds on all items", () => {
  const checkValue = check.items(check.trim());
  const result = checkValue(["one", " two  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check fails when child check fails on at least one item", () => {
  const checkValue = check.items(check.is("valid", "is invalid"));
  const result = checkValue(["valid", "invalid one", "invalid two"]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid one",
    path: [1],
  });
});

test("child check is called with all items", () => {
  const checkItem = jest.fn(() => check.ok(42));
  const checkValue = check.items(checkItem);
  checkValue([1, 2, 3]);

  expect(checkItem).toHaveBeenCalledTimes(3);
  expect(checkItem).toHaveBeenCalledWith(1);
  expect(checkItem).toHaveBeenCalledWith(2);
  expect(checkItem).toHaveBeenCalledWith(3);
});

test("child check is called with the additional arguments", () => {
  const checkItem = jest.fn(() => check.ok(42));
  const checkValue = check.items<unknown, number, unknown[]>(checkItem);
  checkValue([1, 2, 3], "one", "two");

  expect(checkItem).toHaveBeenCalledTimes(3);
  expect(checkItem).toHaveBeenNthCalledWith(1, expect.anything(), "one", "two");
  expect(checkItem).toHaveBeenNthCalledWith(2, expect.anything(), "one", "two");
  expect(checkItem).toHaveBeenNthCalledWith(3, expect.anything(), "one", "two");
});

test("correct path is returned with the error", () => {
  const checkValue = check.items((value) =>
    value === "valid" ? check.ok(value) : check.error(value, "is wrong", [2]),
  );
  const result = checkValue(["valid", "invalid"]);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "invalid",
    path: [1, 2],
  });
});
