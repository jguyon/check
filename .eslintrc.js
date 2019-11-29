module.exports = {
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    es6: true,
  },
  overrides: [
    {
      files: ["./*.js"],
      parserOptions: {
        sourceType: "script",
      },
      env: {
        node: true,
      },
    },
    {
      files: ["./test/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
};
