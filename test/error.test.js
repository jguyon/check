import { error } from "../src";

test("error result is returned", () => {
  const result = error("error", ["key"]);

  expect(result).toMatchObject({
    isOk: false,
    path: ["key"],
    message: "error",
  });
});
