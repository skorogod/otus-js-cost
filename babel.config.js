module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
        },
      ],
      ["@babel/preset-react", { runtime: "automatic" }],
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
    ],
    env: {
      production: {
        only: ["src"],
        plugins: [
          "@babel/plugin-transform-runtime",
          [
            "transform-react-remove-prop-types",
            {
              removeImport: true,
            },
          ],
          "@babel/plugin-transform-react-inline-elements",
          "@babel/plugin-transform-react-constant-elements",
        ],
      },
    },
  };
  