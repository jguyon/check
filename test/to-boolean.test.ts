import * as check from "../src";

test("check succeeds with boolean value", () => {
  const checkValue = check.toBoolean();

  for (const [input, output] of [
    [true, true],
    [null, false],
    [undefined, false],
    ["", false],
    [0, false],
    [{}, true],
    [42, true],
    ["asdf", true],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
