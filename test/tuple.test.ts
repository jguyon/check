import * as check from "../src";

test("check succeeds when given value has the right shape", () => {
  const checkValue = check.tuple<string[], [string, string], []>([
    check.chain(check.trim(), check.is("value one")),
    check.chain(check.trim(), check.is("value two")),
  ]);
  const result = checkValue([" value one  ", "   value two  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["value one", "value two"],
  });
});

test("check fails when given value does not have the right length", () => {
  const checkValue = check.tuple<unknown[], [string, string], []>([
    check.is("value one"),
    check.is("value two"),
  ]);
  const result = checkValue(["asdf"]);

  expect(result).toEqual({
    isOk: false,
    error: "does not have 2 items",
    invalidValue: ["asdf"],
    path: [],
  });
});

test("check fails when some items are invalid", () => {
  const checkValue = check.tuple<unknown[], [string, string, string], []>([
    check.is("value one"),
    check.is("value two", "is invalid two"),
    check.is("value three", "is invalid three"),
  ]);
  const result = checkValue(["value one", "invalid", "invalid"]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid two",
    invalidValue: "invalid",
    path: [1],
  });
});

test("given length error is returned with the invalid result", () => {
  const checkValue = check.tuple<unknown[], [string, string], []>(
    [check.is("value one"), check.is("value two")],
    "does not have two items",
  );
  const result = checkValue(["value one"]);

  expect(result).toEqual({
    isOk: false,
    error: "does not have two items",
    invalidValue: ["value one"],
    path: [],
  });
});

test("correct path is returned with the item error", () => {
  const checkValue = check.tuple<unknown[][], [[string, string]], []>([
    check.tuple<unknown[], [string, string], []>([
      check.is("value one", "is invalid"),
      check.is("value two", "is invalid"),
    ]),
  ]);
  const result = checkValue([["value one", "invalid"]]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid",
    path: [0, 1],
  });
});

test("additional arguments are passed to the child checks", () => {
  const checkValue = check.tuple<unknown[], [unknown[], unknown[]], unknown[]>([
    (value, ...args) => check.ok(args),
    (value, ...args) => check.ok(args),
  ]);
  const result = checkValue(["value one", "value two"], "arg one", "arg two");

  expect(result).toEqual({
    isOk: true,
    value: [
      ["arg one", "arg two"],
      ["arg one", "arg two"],
    ],
  });
});
