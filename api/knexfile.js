const { knexSnakeCaseMappers } = require('objection');
const connection = require('./services/config').getDBCredentials();

module.exports = {
  development: {
    ...connection,
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  ...knexSnakeCaseMappers,
};
