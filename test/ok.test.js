import { ok } from "../src";

test("ok result is returned", () => {
  const result = ok("value");

  expect(result).toMatchObject({
    isOk: true,
    value: "value",
  });
});
