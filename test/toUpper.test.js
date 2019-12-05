import { toUpper } from "../src";

test("check succeeds with given value in upper case", () => {
  const check = toUpper();
  const result = check("aBc42");

  expect(result).toEqual({
    isOk: true,
    value: "ABC42",
  });
});
