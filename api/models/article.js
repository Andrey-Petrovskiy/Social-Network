const { Model } = require('objection');

class Article extends Model {
  static tableName = 'articles';
  /*static selectable = ['title', 'text', 'created_at'];*/

  static get relationMappings() {
    const User = require('./user');
    const Like = require('./like');
    const Tag = require('./tag');
    const ArticleImage = require('./article-image');

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
      tags: {
        relation: Model.HasOneThroughRelation,
        modelClass: Tag,
        join: {
          from: 'articles.id',
          through: {
            from: 'articles_tags.article_id',
            to: 'articles_tags.tag_id',
          },
          to: 'tags.id',
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
    };
  }
}

module.exports = Article;
