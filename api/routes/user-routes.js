const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const userController = require('../controllers/user-controller');
const checkPermissions = require('./../middlewares/acl');
const passportJWT = passport.authenticate('jwt', { session: false });
const userModel = require('./../models/user-model');

router.route('/').get(passportJWT, userController.getAllUsers).post(passportJWT, userController.createUser);

router
  .route('/:id')
  .get(passportJWT, userController.getUser)
  .put(
    passportJWT,
    checkPermissions([
      { permission: 'updateAnyUser' },
      { permission: 'updateOwnUser', own: { model: userModel, column: 'id' } },
    ]),
    userController.updateUser
  )
  .delete(
    passportJWT,
    checkPermissions([
      { permission: 'deleteAnyUser' },
      { permission: 'deleteOwnUser', own: { model: userModel, column: 'id' } },
    ]),
    userController.deleteUser
  );

module.exports = router;
