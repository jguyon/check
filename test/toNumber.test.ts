import * as check from "../src";

test("check succeeds with number value", () => {
  const checkValue = check.toNumber();

  for (const [input, output] of [
    [42, 42],
    [null, 0],
    [true, 1],
    ["42", 42],
    [{ toString: () => "42" }, 42],
    ["asdf", NaN],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
