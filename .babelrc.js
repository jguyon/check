module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: process.env.NODE_ENV === "test" ? "commonjs" : false,
        useBuiltIns: "usage",
        corejs: 3,
        loose: true,
      },
    ],
  ],
};
