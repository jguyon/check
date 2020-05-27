import * as check from "../src";

test("check succeeds when given value has only valid items", () => {
  const checkValue = check.items(check.chain(check.string(), check.trim()));
  const result = checkValue(["one", " two  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check fails when given value has invalid items", () => {
  const checkValue = check.items(check.is("valid", "is invalid"));
  const result = checkValue(["valid", "invalid one", "invalid two"]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid one",
    path: [1],
  });
});

test("correct path is returned with the error", () => {
  const checkValue = check.items(check.items(check.is("valid", "is invalid")));
  const result = checkValue([["valid", "invalid"]]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid",
    path: [0, 1],
  });
});

test("additional arguments are passed to the child check", () => {
  const checkValue = check.items((value, ...args) => check.ok(args));
  const result = checkValue([1, 2], "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: [
      ["one", "two"],
      ["one", "two"],
    ],
  });
});
