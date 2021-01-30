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

  static JWT() {
    return {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }

  static getMailer() {
    return {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
  }
}

module.exports = Config;
