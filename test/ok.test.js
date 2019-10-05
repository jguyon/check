import { ok } from "../src";

test("ok result is returned", () => {
  const result = ok("value");

  expect(result).toEqual({
    isOk: true,
    value: "value",
  });
});
