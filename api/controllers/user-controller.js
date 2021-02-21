const userModel = require('./../models/user-model');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.findAll();

  res.status(200).json({
    users: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModel.findById(id);

  if (!user) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const props = req.body;
  const user = await userModel.create(props);

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const props = req.body;
  const id = req.params.id;
  const user = await userModel.update(id, props);

  if (!user) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModel.remove(id);

  if (!user) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `user ${id} deleted`,
  });
});
