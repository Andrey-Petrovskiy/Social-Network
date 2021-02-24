const { Model } = require('objection');

class Like extends Model {
  static tableName = 'likes';

  static get relationMappings() {
    const User = require('./user');
    const Article = require('./article');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'likes.user_id',
          to: 'users.id',
        },
      },
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: Article,
        join: {
          from: 'likes.article_id',
          to: 'articles.id',
        },
      },
    };
  }
}

module.exports = Like;
