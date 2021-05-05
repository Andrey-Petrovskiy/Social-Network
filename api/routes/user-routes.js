const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const User = require('./../models/user');
const userController = require('../controllers/user-controller');
const checkPermissions = require('./../middlewares/acl');
const validator = require('./../middlewares/validator');
const passportJWT = passport.authenticate('jwt', { session: false });
const upload = require('./../middlewares/uploader');

router.route('/').get(/*passportJWT,*/ userController.getAllUsers);

router
  .route('/:id')
  .get(passportJWT, userController.getUser)
  .put(
    passportJWT,
    checkPermissions([
      { permission: 'updateAnyUser' },
      { permission: 'updateOwnUser', own: { model: User, column: 'id' } },
    ]),
    validator({
      password: ['min:8', 'max:50'],
      email: ['required', 'email', 'unique:users:update'],
    }),
    userController.updateUser
  )
  .delete(
    passportJWT,
    checkPermissions([
      { permission: 'deleteAnyUser' },
      { permission: 'deleteOwnUser', own: { model: User, column: 'id' } },
    ]),
    userController.deleteUser
  );

router
  .route('/:id/avatar')
  .get(passportJWT, userController.getAvatar)
  .put(passportJWT, /*upload.single('avatar'), */ userController.updateAvatar);

module.exports = router;
