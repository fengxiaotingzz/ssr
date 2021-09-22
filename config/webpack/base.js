const path = require("path");
const merge = require("webpack-merge").merge;
const HtmlWebpacPlugin = require("html-webpack-plugin");
const glob = require("glob");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFile = glob.sync(
    path.join(__dirname, "../../src/components/*/index.js")
  );

  entryFile.forEach((key) => {
    const arr = key.match(/src\/components\/(.*)\/index\.js/g);

    const name = arr[0].split("/components/")[1].split("/")[0];
    entry[name] = `./${arr[0]}`;
    // htmlWebpackPlugin.push(
    //   new HtmlWebpacPlugin({
    //     template: `./src/index.html`,
    //     filename: "[name].html",
    //   })
    // );
  });

  return { entry };
};

const { entry = {} } = setMPA();
class BaseWebpackConfig {
  constructor() {
    this.__config = this.defaultConfig;
  }

  set config(data) {
    this._config = merge({}, this.defaultConfig, data);
    return this._config;
  }

  get config() {
    return this.__config;
  }

  get defaultConfig() {
    return {
      mode: "development",
      target: "node",
      devtool: "source-map",
      entry: entry,
      output: {
        filename: "[name].js",
        path: path.join(__dirname, "../../dist"),
        libraryTarget: "umd",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader",
            exclude: path.resolve(__dirname, "node_modules"),
          },
        ],
      },
      plugins: [
        new HtmlWebpacPlugin({
          template: "./src/index.html",
          inject: false,
        }),
      ],
    };
  }
}

module.exports = BaseWebpackConfig;
