const activeRecord = require('./active-record');

const tableName = 'articles';
const selectableProps = ['id', 'title', 'text', 'created_at'];

const articleModel = activeRecord(tableName, selectableProps);

module.exports = articleModel;
