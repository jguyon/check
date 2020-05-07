import * as check from "../src";

test("check succeeds with the truncated value", () => {
  const checkValue = check.truncate();

  for (const [input, output] of [
    [42, 42],
    [42.1, 42],
    [42.99, 42],
    [-42, -42],
    [-42.1, -42],
    [-42.99, -42],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
