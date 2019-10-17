import { shape, pipe, trim, equal, any, ref } from "../src";

test("check succeeds when given value has the right shape", () => {
  const check = shape({
    one: pipe(
      trim(),
      equal("value one"),
    ),
    two: pipe(
      trim(),
      equal("value two"),
    ),
  });
  const result = check({
    one: "  value one   ",
    two: " value two  ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "value one",
      two: "value two",
    },
  });
});

test("check succeeds when given value has the right shape with refs", () => {
  const check = shape({
    one: pipe(
      trim(),
      equal(ref(["two"])),
    ),
    two: pipe(
      trim(),
      equal("valid"),
    ),
  });
  const result = check({
    one: "  valid    ",
    two: " valid  ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "valid",
      two: "valid",
    },
  });
});

test("check fails when given value has the wrong shape", () => {
  const check = shape({
    one: equal("value one"),
    two: equal("value two", 'is not equal to "value two"'),
    three: equal("value three", 'is not equal to "value three"'),
  });
  const result = check({
    one: "value one",
    two: "asdf",
    three: "fdsa",
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["two"],
        value: "asdf",
        message: 'is not equal to "value two"',
      },
      {
        path: ["three"],
        value: "fdsa",
        message: 'is not equal to "value three"',
      },
    ],
  });
});

test("check fails when given value has the wrong shape with refs", () => {
  const check = shape({
    one: equal("valid"),
    two: equal(ref(["one"]), "is not equal to key one"),
    three: equal("three", 'is not equal to "three"'),
  });
  const result = check({
    one: "valid",
    two: "invalid",
    three: "four",
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["two"],
        value: "invalid",
        message: "is not equal to key one",
      },
      {
        path: ["three"],
        value: "four",
        message: 'is not equal to "three"',
      },
    ],
  });
});

test("cascading refs are supported", () => {
  const check = shape({
    one: pipe(
      trim(),
      equal(ref(["two"])),
    ),
    two: trim(),
    three: pipe(
      trim(),
      equal(ref(["one"])),
    ),
  });
  const validResult = check({
    one: "  value",
    two: " value   ",
    three: "    value  ",
  });
  const invalidOneResult = check({
    one: "invalid",
    two: "valid",
    three: "valid",
  });
  const invalidThreeResult = check({
    one: "valid",
    two: "valid",
    three: "invalid",
  });

  expect(validResult).toEqual({
    isOk: true,
    value: {
      one: "value",
      two: "value",
      three: "value",
    },
  });
  expect(invalidOneResult).toEqual({
    isOk: false,
    errors: [
      {
        path: ["one"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
  expect(invalidThreeResult).toEqual({
    isOk: false,
    errors: [
      {
        path: ["three"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("transformed refs are supported", () => {
  const check = shape({
    one: any(),
    two: pipe(
      trim(),
      equal(ref(["one"], v => v.trim())),
    ),
  });
  const result = check({
    one: "  valid ",
    two: " valid  ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "  valid ",
      two: "valid",
    },
  });
});

test("correct path is returned with the error", () => {
  const check = shape({
    one: shape({
      two: shape({
        three: equal("valid", "is invalid"),
      }),
    }),
  });
  const result = check({
    one: {
      two: {
        three: "invalid",
      },
    },
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["one", "two", "three"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("invalid refs are not supported", () => {
  expect(() => {
    shape({
      key: equal(ref(["invalid"])),
    });
  }).toThrowError("expected ref to reference a valid path");
});

test("circular refs are not supported", () => {
  for (const make of [
    () =>
      shape({
        one: equal(ref(["two"])),
        two: equal(ref(["one"])),
      }),
    () =>
      shape({
        key: equal(ref([])),
      }),
    () =>
      shape({
        one: equal(ref(["two"])),
        two: equal(ref(["three"])),
        three: equal(ref(["four"])),
        four: equal(ref(["five"])),
        five: equal(ref(["one"])),
      }),
  ]) {
    expect(() => make()).toThrowError(
      "expected no circular dependencies in refs",
    );
  }
});
