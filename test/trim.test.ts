import * as check from "../src";

test("check succeeds with trimmed value", () => {
  const checkValue = check.trim();

  for (const [input, output] of [
    ["value", "value"],
    ["  value", "value"],
    ["value   ", "value"],
    ["   value ", "value"],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
