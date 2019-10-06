import { finite } from "../src";

test("check succeeds when given value is finite", () => {
  const check = finite();

  for (const value of [42, -42, 0, Math.PI]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("checks fails when given valid is not finite", () => {
  const check = finite();

  for (const value of [Infinity, -Infinity, NaN]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is not a finite number",
        },
      ],
    });
  }
});

test("given message is returned with the error", () => {
  const check = finite("is not finity finite");
  const result = check(NaN);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: NaN,
        message: "is not finity finite",
      },
    ],
  });
});
