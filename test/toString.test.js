import { toString } from "../src";

test("check succeeds with stringified value", () => {
  const check = toString();

  for (const [input, output] of [
    [null, ""],
    [undefined, ""],
    [true, "true"],
    [42, "42"],
    ["value", "value"],
    [{ toString: () => "value" }, "value"],
  ]) {
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
