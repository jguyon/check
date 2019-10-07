import { equal, ref, checkWithRefs, ok, error } from "../src";

const VALID_VALUES = [null, true, 42, "value", { key: "value" }, NaN];

test("check succeeds when given input is equal to given value", () => {
  for (const value of VALID_VALUES) {
    const check = equal(value);
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check succeeds when given input is equal to given ref", () => {
  const check = equal(ref(["value"]));

  for (const value of VALID_VALUES) {
    const result = checkWithRefs(check, value, {
      path: ["value"],
      result: ok(value),
    });

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

const INVALID_VALUES = [
  [null, undefined],
  [true, false],
  [42, 43],
  ["valid", "invalid"],
  [{ key: "value" }, { key: "value" }],
];

test("check fails when given input is not equal to given value", () => {
  for (const [value, input] of INVALID_VALUES) {
    const check = equal(value);
    const result = check(input);

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value: input,
          message: "is invalid",
        },
      ],
    });
  }
});

test("check fails when given input is not equal to given ref", () => {
  const check = equal(ref(["value"]));

  for (const [value, input] of INVALID_VALUES) {
    const result = checkWithRefs(check, input, {
      path: ["value"],
      result: ok(value),
    });

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value: input,
          message: "is invalid",
        },
      ],
    });
  }
});

test("check succeeds when given ref fails", () => {
  const check = equal(ref(["value"]));
  const result = checkWithRefs(check, 42, {
    path: ["value"],
    result: error("value", "is invalid"),
  });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("given message is returned with the error", () => {
  const check = equal("valid", 'is not equal to "valid"');
  const result = check("invalid");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "invalid",
        message: 'is not equal to "valid"',
      },
    ],
  });
});
