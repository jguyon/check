import { defaultTo } from "../src";

test("check succeeds with given value when it is present", () => {
  const check = defaultTo("value");

  for (const value of [42, true, false, {}, "other", 0, NaN, ""]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check succeeds with default value when given value is absent", () => {
  const check = defaultTo("value");

  for (const value of [null, undefined]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value: "value",
    });
  }
});
