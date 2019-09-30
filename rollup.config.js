const path = require("path");
const babel = require("rollup-plugin-babel");

const input = "src/index.js";

function makeOutput(format) {
  return {
    file: `dist/check.${format}.js`,
    format,
    sourcemap: true,
  };
}

function isDependency(id) {
  return !id.startsWith(".") && !id.startsWith(path.join(__dirname, "src"));
}

function makePlugins() {
  return [
    babel({
      sourceMaps: true,
    }),
  ];
}

module.exports = [
  {
    input,
    output: makeOutput("cjs"),
    external: isDependency,
    plugins: makePlugins(),
  },
  {
    input,
    output: makeOutput("esm"),
    external: isDependency,
    plugins: makePlugins(),
  },
];
