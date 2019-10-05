import { toLowerCase } from "../src";

test("check succeeds with given value in lower case", () => {
  const check = toLowerCase();
  const result = check("AbC42");

  expect(result).toEqual({
    isOk: true,
    value: "abc42",
  });
});
