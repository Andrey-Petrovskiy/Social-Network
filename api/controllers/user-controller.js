const User = require('./../models/user');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.query().select('name');

  /*
  const users = await User.query()
    .modify('selectFollowed', '12')
    .withGraphFetched('articles(visibleToAll)')
    .modifiers({
      visibleToAll(builder) {
        builder.where('visible_to', 'all');
      },
    });
*/

  res.status(200).json({
    users: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.query().findById(id).withGraphFetched('articles');

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

/*exports.createUser = catchAsync(async (req, res, next) => {
  const props = req.body;
  const user = await User.query().insert(props);

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});*/

exports.updateUser = catchAsync(async (req, res, next) => {
  const props = req.body;
  const id = req.params.id;
  const user = await User.query().patchAndFetchById(id, props);

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

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.query().deleteById(id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `user ${id} deleted`,
  });
});
