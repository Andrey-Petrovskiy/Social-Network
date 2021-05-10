const { Model } = require('objection');
const bcrypt = require('bcrypt');
const AppError = require('./../errors/app-error');

class User extends Model {
  static tableName = 'users';

  static async create(props) {
    const beforeSave = (user) => {
      if (user.google_id || user.facebook_id) {
        return user;
      } else {
        const hashPassword = (password) => bcrypt.hashSync(password, 10);
        return { ...user, password: hashPassword(user.password) };
      }
    };

    return this.query().insert(await beforeSave(props));
  }

  static async verify(email, password) {
    const user = await this.query().findOne({ email: email });

    if (!user.email_confirmed) {
      throw new AppError('Please confirm your email', 401);
    } else if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Incorrect email or password', 401);
    } else {
      return user;
    }
  }

  static modifiers = {
    selectFollowed(query, id) {
      const { ref } = User;
      query.joinRelated('userIsFollowed').select(ref('id')).where(ref('follower_id'), id);
    },

    selectFollowers(query, id) {
      query.joinRelated('userIsFollowing').select('id').where('followed_id', id);
    },

    selectFriends(query, id) {
      query
        .joinRelated('[userIsFollowed, userIsFollowing]')
        .select('id')
        .where('userIsFollowed.follower_id', id)
        .andWhere('userIsFollowing.followed_id', id);
    },
  };

  static get relationMappings() {
    const University = require('./university');
    const Like = require('./like');
    const Article = require('./article');
    const Follower = require('./follower');

    return {
      university: {
        relation: Model.BelongsToOneRelation,
        modelClass: University,
        join: {
          from: 'users.university_id',
          to: 'universities.id',
        },
      },
      articles: {
        relation: Model.HasManyRelation,
        modelClass: Article,
        join: {
          from: 'users.id',
          to: 'articles.user_id',
        },
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: 'users.id',
          to: 'likes.user_id',
        },
      },
      userIsFollowed: {
        relation: Model.HasManyRelation,
        modelClass: Follower,
        join: {
          from: 'users.id',
          to: 'followers.leader_id',
        },
      },
      userIsFollowing: {
        relation: Model.HasManyRelation,
        modelClass: Follower,
        join: {
          from: 'users.id',
          to: 'followers.follower_id',
        },
      },
    };
  }
}

module.exports = User;
