import * as check from "../src";

test("ok result is returned", () => {
  const result = check.ok("value");

  expect(result).toEqual({
    isOk: true,
    value: "value",
  });
});
