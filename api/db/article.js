const ActiveRecord = require('./active-record');

class Article extends ActiveRecord {
  static tableName = 'articles';
  static selectableProps = ['id', 'title', 'text'];
}

module.exports = Article;
