const { Model } = require('objection');

class Tag extends Model {
  static tableName = 'articles';

  static get relationMappings() {
    const Article = require('./article');

    return {
      articles: {
        relation: Model.HasOneThroughRelation,
        modelClass: Article,
        join: {
          from: 'tags.id',
          through: {
            from: 'articles_tags.tag_id',
            to: 'articles_tags.article_id',
          },
          to: 'articles.id',
        },
      },
    };
  }
}

module.exports = Tag;
