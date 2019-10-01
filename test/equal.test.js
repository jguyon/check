import { equal } from "../src";

test("check succeeds when given value is equal", () => {
  for (const value of [null, true, 42, "value", { key: "value" }]) {
    const check = equal(value);
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given valid is not equal", () => {
  for (const [value, input] of [
    [null, undefined],
    [true, false],
    [42, 43],
    ["valid", "invalid"],
    [{ key: "value" }, { key: "value" }],
  ]) {
    const check = equal(value);
    const result = check(input);

    expect(result).toMatchObject({
      isOk: false,
      path: [],
      message: "is invalid",
    });
  }
});

test("given message is returned with the error", () => {
  const check = equal("valid", 'is not equal to "valid"');
  const result = check("invalid");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: 'is not equal to "valid"',
  });
});
