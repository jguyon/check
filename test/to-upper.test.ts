import * as check from "../src";

test("check succeeds with upper cased value", () => {
  const checkValue = check.toUpper();
  const result = checkValue("aBc42");

  expect(result).toEqual({
    isOk: true,
    value: "ABC42",
  });
});
