const { Model } = require('objection');

class ArticleImage extends Model {
  static tableName = 'article_images';

  static get relationMappings() {
    const Article = require('./article');

    return {
      articles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Article,
        join: {
          from: 'article_images.article_id',
          to: 'articles.id',
        },
      },
    };
  }
}

module.exports = ArticleImage;
