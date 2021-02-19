const userModel = require('./../models/user-model');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');

const permissions = {
  user: ['updateOwnPost', 'deleteOwnPost', 'updateOwnUser', 'deleteOwnUser'],
  moderator: ['updateOwnPost', 'updateAnyPost', 'deleteOwnPost', 'deleteAnyPost', 'updateOwnUser', 'deleteOwnUser'],
  admin: [
    'updateAnyPost',
    'deleteAnyPost',
    'updateOwnPost',
    'deleteOwnPost',
    'updateOwnUser',
    'updateAnyUser',
    'deleteOwnUser',
    'deleteAnyUser',
  ],
};

module.exports = (restrictions) => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { role } = await userModel.findById(id);
    const userPermissions = permissions[role];

    for await (const restriction of restrictions) {
      if (restriction.own) {
        const item = await restriction.own.model.findById(req.params.id);

        if (!item) {
          return next(new AppError('There is no item to perform this action on', 404));
        }

        const itemColumn = item[restriction.own.column];

        if (itemColumn === id && userPermissions.includes(restriction.permission)) {
          return next();
        }
      } else if (userPermissions.includes(restriction.permission)) {
        return next();
      }
    }

    return next(new AppError('You are not authorized to perform this action', 401));
  });
};
