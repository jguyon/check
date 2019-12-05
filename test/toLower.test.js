import { toLower } from "../src";

test("check succeeds with given value in lower case", () => {
  const check = toLower();
  const result = check("AbC42");

  expect(result).toEqual({
    isOk: true,
    value: "abc42",
  });
});
