import { truncate } from "../src";

test("check succeeds with truncated value", () => {
  const check = truncate();

  for (const [input, output] of [
    [42, 42],
    [42.1, 42],
    [42.99, 42],
    [-42, -42],
    [-42.1, -42],
    [-42.99, -42],
  ]) {
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
