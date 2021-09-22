const BaseWebpackConfig = require("./base");

class BuildWebpackConfig extends BaseWebpackConfig {
  constructor() {
    super();
    this.config = {
      mode: "production",
    };
  }
}

module.exports = BuildWebpackConfig;
