const { Model } = require('objection');

class CommentImage extends Model {
  static tableName = 'article_images';

  static get relationMappings() {
    const Comment = require('./comment');

    return {
      articles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'comment_images.comment_id',
          to: 'comments.id',
        },
      },
    };
  }
}

module.exports = CommentImage;
