const fs = require('fs');
const User = require('./../models/user');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');
const imageDir = require('./../services/config').getImageDirectory();

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.query().select('name');

  res.status(200).json({
    users: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.query().findById(req.params.id).withGraphFetched('articles');

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.query().patchAndFetchById(req.params.id, req.body);

  if (!updatedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  const { password, ...user } = { ...updatedUser };

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.query().deleteById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `user ${id} deleted`,
  });
});

exports.getAvatar = catchAsync(async (req, res, next) => {
  const user = await User.query().findById(req.params.id);
  const avatar = user.avatar;

  res.sendFile(`${avatar}`, { root: imageDir });
});

exports.updateAvatar = catchAsync(async (req, res, next) => {
  const avatarData = req.body.avatar.split(',');
  const extension = avatarData[0].split('/')[1].split(';')[0];
  const fileName = `${Date.now()}.${extension}`;
  const buf = new Buffer.from(avatarData[1], 'base64');

  fs.writeFileSync(`${__dirname}/../public/uploads/${fileName}`, buf);

  const user = await User.query().patchAndFetchById(req.params.id, { avatar: fileName });

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});
