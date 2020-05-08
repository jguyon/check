import * as check from "../src";

test("check succeeds with lower cased value", () => {
  const checkValue = check.toLower();
  const result = checkValue("AbC42");

  expect(result).toEqual({
    isOk: true,
    value: "abc42",
  });
});
