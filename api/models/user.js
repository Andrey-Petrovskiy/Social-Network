const { Model } = require('objection');
const bcrypt = require('bcrypt');
const AppError = require('./../errors/app-error');
//TODO follower relations

class User extends Model {
  static tableName = 'users';

  static async create(props) {
    const beforeSave = (user) => {
      if (user.google_id || user.facebook_id) {
        return user;
      } else if (!user.password) {
        throw new AppError('Please enter a password', 401);
      } else {
        const hashPassword = (password) => bcrypt.hashSync(password, 10);
        return { ...user, password: hashPassword(user.password) };
      }
    };

    return this.query().insert(await beforeSave(props));
  }

  static async verify(email, password) {
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await this.query().findOne({ email: email });

    if (!user.email_confirmed) {
      throw new AppError('Please confirm your email', 401);
    } else if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Incorrect email or password', 401);
    } else {
      return user;
    }
  }

  static get relationMappings() {
    const City = require('./city');
    const University = require('./university');
    const Like = require('./like');
    const Article = require('./article');
    const Follower = require('./follower');

    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        join: {
          from: 'users.city_id',
          to: 'cities.id',
        },
      },
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
          to: 'followers.followed_id',
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
