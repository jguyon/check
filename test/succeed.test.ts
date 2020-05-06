import * as check from "../src";

test("check succeeds with given value", () => {
  const checkValue = check.succeed();

  for (const value of [
    null,
    undefined,
    true,
    false,
    "",
    "hello",
    42,
    0,
    {},
    { key: "value" },
    [],
    ["goodbye"],
    new Date(),
  ]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});
