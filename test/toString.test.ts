import * as check from "../src";

test("check succeeds with string value", () => {
  const checkValue = check.toString();

  for (const [input, output] of [
    [null, ""],
    [undefined, ""],
    [true, "true"],
    [42, "42"],
    ["value", "value"],
    [{ toString: () => "value" }, "value"],
  ]) {
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
