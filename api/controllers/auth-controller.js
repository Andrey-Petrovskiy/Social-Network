const jwt = require('jsonwebtoken');
const userModel = require('./../models/user-model');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');
const config = require('./../services/config');

const signToken = (id) => {
  return jwt.sign({ id }, config.JWT().secret, { expiresIn: config.JWT().expiresIn });
};

const signUp = catchAsync(async (req, res, next) => {
  const props = { email: req.body.email, password: req.body.password };

  if (await userModel.findOne({ email: props.email })) {
    return next(new AppError('User with this email already exists', 401));
  }

  const user = await userModel.create(props);
  const token = signToken(user.id);

  res.status(201).json({
    status: 'success',
    message: 'Registration successful',
    token: 'Bearer ' + token,
    data: {
      user: user,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.verify(email, password);
  const token = signToken(user.id);

  res.status(200).json({
    status: 'success',
    token: 'Bearer ' + token,
  });
});

module.exports = { signUp, login };
