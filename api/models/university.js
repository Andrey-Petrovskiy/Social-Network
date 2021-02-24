const { Model } = require('objection');

class University extends Model {
  static tableName = 'universities';

  static get relationMappings() {
    const User = require('./user');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'universities.id',
          to: 'users.university_id',
        },
      },
    };
  }
}

module.exports = University;
