import * as check from "../src";

test("check succeeds when all child checks succeed", async () => {
  const checkValue = check.chainAsync(
    check.string(),
    check.trim(),
    check.testAsync(async (value) => value === "jerome"),
  );
  const result = await checkValue("  jerome   ");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check succeeds when no checks are given", async () => {
  const checkValue = check.chainAsync();
  const result = await checkValue("jerome");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check fails with error from first failing child check", async () => {
  const checkValue = check.chainAsync(
    check.string(),
    check.trim(),
    check.testAsync(async (value) => value === "jerome", "is not jerome"),
    check.toUpper(),
  );
  const result = await checkValue("  john   ");

  expect(result).toEqual({
    isOk: false,
    error: "is not jerome",
    invalidValue: "john",
    path: [],
  });
});

test("additional arguments are passed to the child checks", async () => {
  const checkValue = check.chainAsync(
    async (value, ...args) => check.ok(args),
    async (value, ...args) => check.ok([value, args]),
  );
  const result = await checkValue(null, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: [
      ["one", "two"],
      ["one", "two"],
    ],
  });
});
