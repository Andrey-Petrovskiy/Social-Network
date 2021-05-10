const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('./config').getAuth().JWT;

const signTokens = (user) => {
  const accessTokenExpiresIn = dayjs().add(30, 'minute');
  const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.accessExpiresIn });

  const refreshTokenExpiresIn = dayjs().add(30, 'day');
  const refreshToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpiresIn });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpiresIn,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpiresIn,
    },
  };
};

module.exports = signTokens;
