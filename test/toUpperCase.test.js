import { toUpperCase } from "../src";

test("check succeeds with given value in upper case", () => {
  const check = toUpperCase();
  const result = check("aBc42");

  expect(result).toEqual({
    isOk: true,
    value: "ABC42",
  });
});
