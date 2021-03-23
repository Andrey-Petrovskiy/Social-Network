exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('avatar');
  });
};

exports.down = function (knex) {};
