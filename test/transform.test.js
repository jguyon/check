import { transform } from "../src";

test("check succeeds with transformed value", () => {
  const check = transform(String);
  const result = check(42);

  expect(result).toMatchObject({
    isOk: true,
    value: "42",
  });
});
