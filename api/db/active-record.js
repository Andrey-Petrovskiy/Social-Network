const DI = require('./../services/di');

class ActiveRecord {
  static db = DI.get('dbConnection');
  static tableName;
  static selectableProps = [];

  static findAll() {
    return this.db.select(this.selectableProps).from(this.tableName);
  }

  static findById(id) {
    return this.db
      .select(this.selectableProps)
      .from(this.tableName)
      .where('id', id);
  }

  static create(props) {
    delete props.id;

    return this.db
      .insert(props)
      .returning(this.selectableProps)
      .into(this.tableName);
  }

  static update(id, props) {
    delete props.id;

    return this.db
      .update(props)
      .from(this.tableName)
      .where('id', id)
      .returning(this.selectableProps);
  }

  static remove(id) {
    return this.db.del().from(this.tableName).where('id', id);
  }
}

module.exports = ActiveRecord;
