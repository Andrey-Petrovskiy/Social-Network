const db = require('./../services/di').get('dbConnection');

const activeRecord = (tableName, selectableProps) => {
  const findAll = () => db.select(selectableProps).from(tableName);

  const findById = (id) => db.select(selectableProps).from(tableName).where('id', id).first();

  const findOne = (filters) => db.select(selectableProps).from(tableName).where(filters).first();

  const create = async (props) => {
    delete props.id;
    const user = await db.insert(props).returning(selectableProps).into(tableName);
    return user[0];
  };

  const update = async (id, props) => {
    delete props.id;
    const results = await db.update(props).from(tableName).where('id', id).returning(selectableProps);
    if (!Array.isArray(results)) return results;

    return results[0];
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
