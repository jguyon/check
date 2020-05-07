import * as check from "../src";

test("check succeeds with the ceiled value", () => {
  const checkValue = check.ceil();

  for (const [input, output] of [
    [42, 42],
    [42.9, 43],
    [42.01, 43],
    [-42, -42],
    [-42.99, -42],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
