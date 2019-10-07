import { notEqual, ref, checkWithRefs, ok, error } from "../src";

const VALID_VALUES = [
  [null, undefined],
  [true, false],
  [42, 43],
  ["valid", "invalid"],
  [{ key: "value" }, { key: "value" }],
];

test("check succeeds when given input is not equal to given value", () => {
  for (const [value, input] of VALID_VALUES) {
    const check = notEqual(value);
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: input,
    });
  }
});

test("check succeeds when given input is not equal to given ref", () => {
  const check = notEqual(ref(["value"]));

  for (const [value, input] of VALID_VALUES) {
    const result = checkWithRefs(check, input, {
      path: ["value"],
      result: ok(value),
    });

    expect(result).toEqual({
      isOk: true,
      value: input,
    });
  }
});

const INVALID_VALUES = [null, true, 42, "value", { key: "value" }, NaN];

test("check fails when given input is equal to given value", () => {
  for (const value of INVALID_VALUES) {
    const check = notEqual(value);
    const result = check(value);

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is invalid",
        },
      ],
    });
  }
});

test("check fails when given input is not equal to given ref", () => {
  const check = notEqual(ref(["value"]));

  for (const value of INVALID_VALUES) {
    const result = checkWithRefs(check, value, {
      path: ["value"],
      result: ok(value),
    });

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is invalid",
        },
      ],
    });
  }
});

test("check succeeds when given ref fails", () => {
  const check = notEqual(ref(["value"]));
  const result = checkWithRefs(check, 42, {
    path: ["value"],
    result: error(42, "is invalid"),
  });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("given message is returned with the error", () => {
  const check = notEqual("invalid", 'is equal to "invalid"');
  const result = check("invalid");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "invalid",
        message: 'is equal to "invalid"',
      },
    ],
  });
});
