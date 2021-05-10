const { Model } = require('objection');

class Article extends Model {
  static tableName = 'articles';

  static get relationMappings() {
    const User = require('./user');
    const Like = require('./like');
    const ArticleImage = require('./article-image');
    const Comment = require('./comment');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'articles.user_id',
          to: 'users.id',
        },
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: 'articles.id',
          to: 'likes.article_id',
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: ArticleImage,
        join: {
          from: 'articles.id',
          to: 'article_images.article_id',
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'articles.id',
          to: 'comments.article_id',
        },
      },
    };
  }
}

module.exports = Article;
