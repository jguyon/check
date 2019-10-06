import { errors } from "../src";

test("error result is returned", () => {
  const errs = [
    {
      path: ["one"],
      value: 1,
      message: "is one",
    },
    {
      path: ["two"],
      value: 2,
      message: "is two",
    },
  ];
  const result = errors(errs);

  expect(result).toEqual({
    isOk: false,
    errors: errs,
  });
});
