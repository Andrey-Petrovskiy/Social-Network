const db = require('./../services/di').get('dbConnection');

const activeRecord = (tableName, selectableProps) => {
  const findAll = () => db.select(selectableProps).from(tableName);

  const findById = (id) => db.select(selectableProps).from(tableName).where('id', id);

  const findOne = (filters) => db.select(selectableProps).from(tableName).where(filters).first();

  const create = (props) => {
    delete props.id;
    return db.insert(props).returning(selectableProps).into(tableName);
  };

  const update = (id, props) => {
    delete props.id;
    db.update(props).from(tableName).where('id', id).returning(selectableProps);
  };

  const remove = (id) => db.del().from(tableName).where('id', id);

  return {
    findAll,
    findById,
    findOne,
    create,
    update,
    remove,
  };
};

module.exports = activeRecord;
