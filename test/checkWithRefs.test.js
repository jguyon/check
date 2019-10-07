import { checkWithRefs, withRefs, ref, ok, error } from "../src";

test("resolved refs are given to check", () => {
  const check = withRefs([ref(["one"]), ref(["two"])], (input, refResults) =>
    ok({ input, refResults }),
  );
  const result = checkWithRefs(
    check,
    "value",
    {
      path: ["one"],
      result: ok("ref one"),
    },
    {
      path: ["two"],
      result: ok("ref two"),
    },
  );

  expect(result).toEqual({
    isOk: true,
    value: {
      input: "value",
      refResults: [
        {
          isOk: true,
          value: "ref one",
        },
        {
          isOk: true,
          value: "ref two",
        },
      ],
    },
  });
});

test("given refs are transformed", () => {
  const check = withRefs(
    [ref(["one"], String), ref(["two"], String)],
    (input, refResults) => ok({ input, refResults }),
  );
  const result = checkWithRefs(
    check,
    "input",
    {
      path: ["one"],
      result: ok(42),
    },
    {
      path: ["two"],
      result: error(42, "is invalid"),
    },
  );

  expect(result).toEqual({
    isOk: true,
    value: {
      input: "input",
      refResults: [
        {
          isOk: true,
          value: "42",
        },
        {
          isOk: false,
          errors: [
            {
              path: [],
              value: 42,
              message: "is invalid",
            },
          ],
        },
      ],
    },
  });
});

test("normal values as refs are supported", () => {
  const check = withRefs([ref(["key"]), 42], (input, refResults) =>
    ok({ input, refResults }),
  );
  const result = checkWithRefs(check, "input", {
    path: ["key"],
    result: ok("value"),
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      input: "input",
      refResults: [
        {
          isOk: true,
          value: "value",
        },
        {
          isOk: true,
          value: 42,
        },
      ],
    },
  });
});
