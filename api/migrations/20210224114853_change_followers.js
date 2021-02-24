exports.up = function (knex) {
  return knex.schema.table('followers', (table) => {
    table.renameColumn('user_id', 'followed');
  });
};

exports.down = function (knex) {};
