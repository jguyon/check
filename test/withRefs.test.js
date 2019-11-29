import { ref, withRefs, ok, error, up } from "../src";

test("all refs are resolved before checking", () => {
  const check = withRefs([ref(["one"]), ref(["two"])], ([one, two], value) =>
    ok({
      one,
      two,
      value,
    }),
  );
  const result = check(42, { one: 1, two: 2 });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
      value: 42,
    },
  });
});

test("literal refs are resolved to themselves", () => {
  const check = withRefs([ref(["value"]), 42], ([one, two]) =>
    ok({
      one,
      two,
    }),
  );
  const result = check(null, { value: "value" });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "value",
      two: 42,
    },
  });
});

test("parents are given to the check", () => {
  const check = withRefs([ref([])], (refValues, value, ...parents) =>
    ok(parents),
  );
  const result = check(null, "parent1", "parent2");

  expect(result).toEqual({
    isOk: true,
    value: ["parent1", "parent2"],
  });
});

test("check with only literal refs works like a normal check", () => {
  const check = withRefs([1, 2], ([one, two], value, ...parents) =>
    ok({
      one,
      two,
      value,
      parents,
    }),
  );
  const result = check("value", "parent1", "parent2");

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
      value: "value",
      parents: ["parent1", "parent2"],
    },
  });
});

test("path with multiple keys is resolved", () => {
  const check = withRefs([ref(["one", 2, "three"])], ([refValue]) =>
    ok(refValue),
  );
  const result = check(null, { one: [null, null, { three: 42 }] });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("empty path is resolved", () => {
  const check = withRefs([ref([])], ([refValue]) => ok(refValue));
  const result = check(null, "parent");

  expect(result).toEqual({
    isOk: true,
    value: "parent",
  });
});

test("path is resolved to undefined when a key cannot be accessed", () => {
  const check = withRefs([ref(["one", "two", "three"])], ([refValue]) =>
    ok(refValue),
  );

  for (const parent of [
    { one: { two: null } },
    { one: { two: undefined } },
    { one: {} },
    { one: null },
    null,
  ]) {
    const result = check(null, parent);

    expect(result).toEqual({
      isOk: true,
      value: undefined,
    });
  }
});

test("path keys are resolved on any object-like values", () => {
  const fn = () => {};
  fn.number = 42;

  for (const { path, parent, value } of [
    { path: ["length"], parent: [1, 2, 3], value: 3 },
    { path: ["number"], parent: fn, value: 42 },
    { path: ["length"], parent: "123", value: 3 },
  ]) {
    const check = withRefs([ref(path)], ([refValue]) => ok(refValue));
    const result = check(null, parent);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("path is resolved on grandparent", () => {
  const check = withRefs([ref([up, up, "one", "two"])], ([refValue]) =>
    ok(refValue),
  );
  const result = check(null, null, null, { one: { two: 42 } });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("path is resolved to undefined when grandparent does not exist", () => {
  const check = withRefs([ref([up])], ([refValue]) => ok(refValue));
  const result = check(null);

  expect(result).toEqual({
    isOk: true,
    value: undefined,
  });
});

test("check is given resolved ref when its check succeeds", () => {
  const check = withRefs(
    [ref(["value"], value => ok(value.toUpperCase()))],
    ([refValue]) => ok(refValue),
  );
  const result = check(null, { value: "value" });

  expect(result).toEqual({
    isOk: true,
    value: "VALUE",
  });
});

test("check fails when ref's check fails", () => {
  const check = withRefs(
    [ref(["value"]), ref(["value"], () => error("value", "message"))],
    ([refValue]) => ok(refValue),
  );
  const result = check(null, { value: 42 });

  expect(result).toEqual({
    isOk: false,
    errors: [],
  });
});

test("check fails with ref's errors when configured", () => {
  const check = withRefs(
    [ref([up, "value"], () => error("value", "message", ["key"]), true)],
    ([refValue]) => ok(refValue),
  );
  const result = check();

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [up, up, "value", "key"],
        value: "value",
        message: "message",
      },
    ],
  });
});
