const glob = require("glob");
const path = require("path");

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entryTargets = glob.sync("functions/src/**/*.ts");
const entry = entryTargets.reduce((acc, value) => {
  const name = value.replace(/functions\/src\//, "").replace(/\.ts$/, "");
  acc[name] = `./${value}`;
  return acc;
}, {});

module.exports = {
  target: "node",
  entry,
  output: {
    path: path.join(__dirname, "functions"),
    filename: "lib/[name].js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  mode: "production",
  devtool: "inline-source-map"
};
