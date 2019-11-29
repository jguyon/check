import { notEqual, ref } from "../src";

test("check succeeds when given value is not equal", () => {
  for (const [value, input] of [
    [null, undefined],
    [true, false],
    [42, 43],
    ["valid", "invalid"],
    [{ key: "value" }, { key: "value" }],
  ]) {
    const check = notEqual(value);
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: input,
    });
  }
});

test("check fails when given value is equal", () => {
  for (const value of [null, true, 42, "value", { key: "value" }, NaN]) {
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

test("refs are supported for test value", () => {
  const check = notEqual(ref(["notEqualTo"]));
  const notEqualResult = check("other", { notEqualTo: "value" });
  const equalResult = check("value", { notEqualTo: "value" });

  expect(notEqualResult).toEqual({
    isOk: true,
    value: "other",
  });
  expect(equalResult).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "value",
        message: "is invalid",
      },
    ],
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
