import * as check from "../src";

test("check succeeds when at least one child check succeeds", () => {
  const checkValue = check.oneOf(
    check.number(),
    check.chain(check.string(), check.toLower()),
    check.chain(check.string(), check.toUpper()),
  );
  const result = checkValue("Jerome");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check fails with error from last failing child check", () => {
  const checkValue = check.oneOf(
    check.string(),
    check.number(),
    check.boolean(),
  );
  const result = checkValue(null);

  expect(result).toEqual({
    isOk: false,
    error: "is not a boolean",
    invalidValue: null,
    path: [],
  });
});

test("additional arguments are passed to the child checks", () => {
  const checkValue = check.oneOf(check.fail(), (value, ...args) =>
    check.ok(args),
  );
  const result = checkValue(null, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});
