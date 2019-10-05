import { trim } from "../src";

test("check succeeds with trimmed value", () => {
  const check = trim();

  for (const [input, output] of [
    ["value", "value"],
    ["  value", "value"],
    ["value   ", "value"],
    ["   value ", "value"],
  ]) {
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});
