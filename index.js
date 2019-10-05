if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/check.production.cjs");
} else {
  module.exports = require("./dist/check.development.cjs");
}
