import { defaultTo, ref } from "../src";

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

test("refs are supported for default value", () => {
  const check = defaultTo(ref(["default"]));
  const nonNullResult = check("other", { default: "value" });
  const nullResult = check(null, { default: "value" });

  expect(nonNullResult).toEqual({
    isOk: true,
    value: "other",
  });
  expect(nullResult).toEqual({
    isOk: true,
    value: "value",
  });
});
