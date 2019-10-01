import { toUpperCase } from "../src";

test("check succeeds with given value in upper case", () => {
  const check = toUpperCase();
  const result = check("aBc42");

  expect(result).toMatchObject({
    isOk: true,
    value: "ABC42",
  });
});
