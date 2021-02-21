const activeRecord = require('./active-record');

const tableName = 'articles';
const selectableProps = ['id', 'user_id', 'title', 'text', 'created_at'];

const articleModel = activeRecord(tableName, selectableProps);

module.exports = articleModel;
