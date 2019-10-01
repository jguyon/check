import { ceil } from "../src";

test("check succeeds with ceiled value", () => {
  const check = ceil();

  for (const [input, output] of [
    [42, 42],
    [42.9, 43],
    [42.01, 43],
    [-42, -42],
    [-42.99, -42],
  ]) {
    const result = check(input);

    expect(result).toMatchObject({
      isOk: true,
      value: output,
    });
  }
});
