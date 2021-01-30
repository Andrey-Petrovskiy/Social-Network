const activeRecord = require('./active-record');

const tableName = 'articles';
const selectableProps = ['id', 'title', 'text'];

const articleModel = activeRecord(tableName, selectableProps);

module.exports = articleModel;
