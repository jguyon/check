import * as check from "../src";

test("check succeeds with the floored value", () => {
  const checkValue = check.floor();

  for (const [input, output] of [
    [42, 42],
    [42.1, 42],
    [42.99, 42],
    [-42, -42],
    [-42.01, -43],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
