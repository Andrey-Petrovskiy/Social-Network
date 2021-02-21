const bcrypt = require('bcrypt');
const AppError = require('./../errors/app-error');
const activeRecord = require('./active-record');
const db = require('./../services/di').get('dbConnection');

const tableName = 'users';
const selectableProps = ['id', 'email', 'role'];

const beforeSave = (user) => {
  if (user.google_id || user.facebook_id) {
    return user;
  }

  if (!user.password) {
    throw new AppError('Please enter a password', 401);
  }

  const hashPassword = (password) => bcrypt.hashSync(password, 10);
  return { ...user, password: hashPassword(user.password) };
};

const userModel = activeRecord(tableName, selectableProps);

const create = async (props) => userModel.create(await beforeSave(props));

const verify = async (email, password) => {
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const findUser = (filters) => db.select().from(tableName).where(filters).first();
  const user = await findUser({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  if (!user.email_confirmed) {
    throw new AppError('Please confirm your email', 401);
  }

  return user;
};

module.exports = { ...userModel, create, verify };
