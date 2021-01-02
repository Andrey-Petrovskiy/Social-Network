require('dotenv').config();

class Config {
  static getPort() {
    return process.env.PORT || 4000;
  }
}

module.exports = Config;
