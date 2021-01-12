require('dotenv').config();

class Config {
  static getPort() {
    return process.env.PORT || 4000;
  }

  static getDBCredentials() {
    return {
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
      },
    };
  }
}

module.exports = Config;
