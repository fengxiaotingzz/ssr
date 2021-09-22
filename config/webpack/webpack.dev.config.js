const BaseWebpackConfig = require("./base");

class DevWebpackConfig extends BaseWebpackConfig {
  constructor() {
    super();
    this.config = {
      mode: "production",
    };
  }
}

module.exports = DevWebpackConfig;
