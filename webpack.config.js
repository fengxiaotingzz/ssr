const webpackConfig = require("./config/webpack/index.js");
let defaultConfig = "dev";

module.exports = (config) => {
  let LoaderConfig = defaultConfig;

  if (config.build) {
    defaultConfig = "build";
  }

  if (webpackConfig[defaultConfig]) {
    LoaderConfig = webpackConfig[defaultConfig];
  }

  let LoaderWebpack = new LoaderConfig();
  process.env.NODE_ENV = LoaderWebpack.env;
  return LoaderWebpack.config;
};
