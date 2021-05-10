exports.up = function (knex) {
  return knex.schema
    .createTable('universities', (table) => {
      table.increments();
      table.string('name');
    })
    .createTable('users', (table) => {
      table.increments();
      table.string('name');
      table.string('email').unique();
      table.boolean('email_confirmed').defaultTo(false).notNullable();
      table.string('password');
      table.string('phone');
      table.date('date_of_birth');
      table.string('avatar_path');
      table.string('token');
      table.string('google_id');
      table.string('facebook_id');
      table.integer('university_id').references('id').inTable('universities');
      table.timestamps(true, true);
    })
    .createTable('followers', (table) => {
      table.integer('leader_id').references('id').inTable('users').notNullable();
      table.integer('follower_id').references('id').inTable('users').notNullable();
      table.timestamps(true, true);
      table.primary(['leader_id', 'follower_id']);
    })
    .createTable('articles', (table) => {
      table.increments();
      table.string('title');
      table.string('text').notNullable();
      table.enu('visible_to', ['all', 'friends', 'me']).defaultTo('all').notNullable();
      table.string('update_text');
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.timestamps(true, true);
    })
    .createTable('article_images', (table) => {
      table.increments();
      table.string('image_path').notNullable();
      table.integer('article_id').references('id').inTable('articles').notNullable();
    })
    .createTable('likes', (table) => {
      table.integer('article_id').references('id').inTable('articles').notNullable();
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.primary(['article_id', 'user_id']);
    })
    .createTable('comments', (table) => {
      table.increments();
      table.string('text').notNullable();
      table.integer('article_id').references('id').inTable('articles').notNullable();
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.integer('parent_id').references('id').inTable('comments');
      table.timestamps(true, true);
    })
    .createTable('comment_images', (table) => {
      table.increments();
      table.string('image_path').notNullable();
      table.integer('comment_id').references('id').inTable('comments').notNullable();
    });
};

exports.down = function (knex) {};
