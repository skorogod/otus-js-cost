const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { argv } = require("process");
const isProduction = argv.mode === "production";
const isDevelopment = !isProduction;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    open: true,
    host: "localhost",
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: path.resolve(__dirname, "./dist/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: isProduction ? "production" : "development",
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};