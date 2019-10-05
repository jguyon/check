import { round } from "../src";

test("check succeeds with rounded value", () => {
  const check = round();

  for (const [input, output] of [
    [42, 42],
    [42.1, 42],
    [42.9, 43],
    [42.5, 43],
    [-42, -42],
    [-42.1, -42],
    [-42.9, -43],
    [-42.5, -42],
  ]) {
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
