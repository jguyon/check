const path = require("path");
const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");

const input = "src/index.js";

function isDependency(id) {
  return !id.startsWith(".") && !id.startsWith(path.join(__dirname, "src"));
}

module.exports = [
  ...["development", "production"].map(nodeEnv => ({
    input,
    output: {
      file: `dist/check.${nodeEnv}.cjs.js`,
      format: "cjs",
      sourcemap: true,
    },
    external: isDependency,
    plugins: [
      babel({
        sourceMaps: true,
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify(nodeEnv),
      }),
    ],
  })),
  {
    input,
    output: {
      file: "dist/check.esm.js",
      format: "esm",
      sourcemap: true,
    },
    external: isDependency,
    plugins: [
      babel({
        sourceMaps: true,
      }),
    ],
  },
];
