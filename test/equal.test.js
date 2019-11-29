import { equal } from "../src";

test("check succeeds when given value is equal", () => {
  for (const value of [null, true, 42, "value", { key: "value" }, NaN]) {
    const check = equal(value);
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not equal", () => {
  for (const [value, input] of [
    [null, undefined],
    [true, false],
    [42, 43],
    ["valid", "invalid"],
    [{ key: "value" }, { key: "value" }],
  ]) {
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
