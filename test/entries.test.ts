import * as check from "../src";

test("check succeeds when given value has only valid key-value pairs", () => {
  const checkValue = check.entries(
    check.chain(check.trim(), check.pattern(/^[0-9]+$/)),
    check.chain(check.string(), check.trim()),
  );
  const result = checkValue({
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

test("check fails when given value has invalid keys", () => {
  const checkValue = check.entries(check.is("one", "is invalid"), check.pass());
  const result = checkValue({ one: 1, two: 2 });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: [],
  });
});

test("check fails when given value has invalid values", () => {
  const checkValue = check.entries(check.pass(), check.is("one", "is invalid"));
  const result = checkValue({ 1: "one", 2: "two" });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: ["2"],
  });
});

test("correct path is returned with the value error", () => {
  const checkValue = check.entries(
    check.pass(),
    check.entries(check.trim(), check.is("one", "is invalid")),
  );
  const result = checkValue({
    foo: {
      1: "one",
      "  2 ": "two",
    },
  });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: ["foo", "  2 "],
  });
});

test("additional arguments are passed to the child key check", () => {
  const checkValue = check.entries(
    (value, ...args) => check.ok(value + JSON.stringify(args)),
    check.pass(),
  );
  const result = checkValue({ 1: 1, 2: 2 }, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: {
      ["1" + JSON.stringify(["one", "two"])]: 1,
      ["2" + JSON.stringify(["one", "two"])]: 2,
    },
  });
});

test("additional arguments are passed to child value check", () => {
  const checkValue = check.entries(check.pass(), (value, ...args) =>
    check.ok(args),
  );
  const result = checkValue({ 1: 1, 2: 2 }, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: {
      1: ["one", "two"],
      2: ["one", "two"],
    },
  });
});
