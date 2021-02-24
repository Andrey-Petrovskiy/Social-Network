const { Model } = require('objection');

class City extends Model {
  static tableName = 'cities';

  static get relationMappings() {
    const User = require('./user');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'cities.id',
          to: 'users.city_id',
        },
      },
    };
  }
}

module.exports = City;
