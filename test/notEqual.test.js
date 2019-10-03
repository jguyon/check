import { notEqual } from "../src";

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

    expect(result).toMatchObject({
      isOk: true,
      value: input,
    });
  }
});

test("check fails when given value is equal", () => {
  for (const value of [null, true, 42, "value", { key: "value" }, NaN]) {
    const check = notEqual(value);
    const result = check(value);

    expect(result).toMatchObject({
      isOk: false,
      path: [],
      message: "is invalid",
    });
  }
});

test("given message is returned with the error", () => {
  const check = notEqual("invalid", 'is equal to "invalid"');
  const result = check("invalid");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: 'is equal to "invalid"',
  });
});
