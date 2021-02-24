const { Model } = require('objection');

class Follower extends Model {
  static tableName = 'cities';

  static get relationMappings() {
    const User = require('./user');

    return {
      followingUsers: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'followers.follower_id',
          to: 'users.id',
        },
      },
      followedUsers: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'followers.followed_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Follower;
