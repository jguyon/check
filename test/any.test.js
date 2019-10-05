import { any } from "../src";

test("checks always succeeds with given value", () => {
  const check = any();

  for (const value of [
    null,
    undefined,
    true,
    false,
    "",
    "hello",
    42,
    0,
    {},
    { key: "value" },
    [],
    ["goodbye"],
    new Date(),
  ]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});
