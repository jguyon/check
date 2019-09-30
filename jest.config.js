module.exports = {
  testMatch: ["<rootDir>/test/*.test.js"],
  testEnvironment: "node",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
