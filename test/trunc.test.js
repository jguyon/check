import { trunc } from "../src";

test("check succeeds with truncated value", () => {
  const check = trunc();

  for (const [input, output] of [
    [42, 42],
    [42.1, 42],
    [42.99, 42],
    [-42, -42],
    [-42.1, -42],
    [-42.99, -42],
  ]) {
    const result = check(input);

    expect(result).toMatchObject({
      isOk: true,
      value: output,
    });
  }
});
