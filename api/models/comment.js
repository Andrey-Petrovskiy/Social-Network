const { Model } = require('objection');

class Comment extends Model {
  static tableName = 'comments';

  static get relationMappings() {
    const Article = require('./article');
    const CommentImages = require('./comment-image-image');

    return {
      articles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Article,
        join: {
          from: 'comments.article_id',
          to: 'articles.id',
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: CommentImages,
        join: {
          from: 'comments.id',
          to: 'comment_images.comment_id',
        },
      },
      responses: {
        relation: Model.HasManyRelation,
        modelClass: this,
        join: {
          from: 'comments.id',
          to: 'comments.parent_id',
        },
      },
      responseTo: {
        relation: Model.BelongsToOneRelation,
        modelClass: this,
        join: {
          from: 'comments.parent_id',
          to: 'comments.id',
        },
      },
    };
  }
}

module.exports = Comment;
