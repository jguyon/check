import { tuple, shape, pipe, string, trim, equal, any, ref } from "../src";

test("check succeeds when given value has the right shape", () => {
  const check = tuple([
    pipe(
      string(),
      trim(),
      equal("one"),
    ),
    pipe(
      string(),
      trim(),
      equal("two"),
    ),
  ]);
  const result = check(["  one", "two  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check succeeds when given value has the right shape with refs", () => {
  const check = tuple([
    pipe(
      string(),
      trim(),
      equal(ref([1])),
    ),
    pipe(
      string(),
      trim(),
      equal("valid"),
    ),
  ]);
  const result = check(["  valid  ", "    valid "]);

  expect(result).toEqual({
    isOk: true,
    value: ["valid", "valid"],
  });
});

test("check fails when given value does not have the right length", () => {
  const check = tuple([string(), string()]);
  const result = check([1]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1],
        message: "does not have 2 items",
      },
    ],
  });
});

test("check fails when some of the checks fail", () => {
  const check = tuple([
    equal("one"),
    equal("two", "is invalid two"),
    equal("three", "is invalid three"),
  ]);
  const result = check(["one", "invalid two", "invalid three"]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1],
        value: "invalid two",
        message: "is invalid two",
      },
      {
        path: [2],
        value: "invalid three",
        message: "is invalid three",
      },
    ],
  });
});

test("check fails when some of the checks with refs fail", () => {
  const check = tuple([
    equal("valid"),
    equal(ref([0]), "is not equal to index 0"),
    equal("three", 'is not equal to "three"'),
  ]);
  const result = check(["valid", "invalid", "four"]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1],
        value: "invalid",
        message: "is not equal to index 0",
      },
      {
        path: [2],
        value: "four",
        message: 'is not equal to "three"',
      },
    ],
  });
});

test("cascading refs are supported", () => {
  const check = tuple([
    pipe(
      trim(),
      equal(ref([1])),
    ),
    trim(),
    pipe(
      trim(),
      equal(ref([0])),
    ),
  ]);
  const validResult = check(["  value ", " value    ", "     value   "]);
  const invalidZeroResult = check(["invalid", "valid", "valid"]);
  const invalidTwoResult = check(["valid", "valid", "invalid"]);

  expect(validResult).toEqual({
    isOk: true,
    value: ["value", "value", "value"],
  });
  expect(invalidZeroResult).toEqual({
    isOk: false,
    errors: [
      {
        path: [0],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
  expect(invalidTwoResult).toEqual({
    isOk: false,
    errors: [
      {
        path: [2],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("transformed refs are supported", () => {
  const check = tuple([
    any(),
    pipe(
      trim(),
      equal(ref([0], v => v.trim())),
    ),
  ]);
  const result = check(["  valid ", "   valid     "]);

  expect(result).toEqual({
    isOk: true,
    value: ["  valid ", "valid"],
  });
});

test("given message is returned with a length error", () => {
  const check = tuple(
    [equal("one"), equal("two")],
    "does not have the right lengthy length",
  );
  const result = check(["one"]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: ["one"],
        message: "does not have the right lengthy length",
      },
    ],
  });
});

test("correct path is returned with a value error", () => {
  const check = tuple([
    equal("one"),
    shape({
      two: shape({
        three: equal("valid", "is invalid"),
      }),
    }),
  ]);
  const result = check([
    "one",
    {
      two: {
        three: "invalid",
      },
    },
  ]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1, "two", "three"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("invalid refs are not supported", () => {
  for (const make of [
    () => tuple([equal(ref(["invalid"]))]),
    () => tuple([any(), equal(ref([0.123]))]),
    () => tuple([equal(ref([1]))]),
  ]) {
    expect(() => make()).toThrowError("expected ref to reference a valid path");
  }
});

test("circular refs are not supported", () => {
  for (const make of [
    () => tuple([equal(ref([1])), equal(ref([0]))]),
    () => tuple([equal(ref([]))]),
    () =>
      tuple([
        equal(ref([1])),
        equal(ref([2])),
        equal(ref([3])),
        equal(ref([4])),
        equal(ref([0])),
      ]),
  ]) {
    expect(() => make()).toThrowError(
      "expected no circular dependencies in refs",
    );
  }
});
