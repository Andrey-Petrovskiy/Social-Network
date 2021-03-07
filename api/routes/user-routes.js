const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const User = require('./../models/user');
const userController = require('../controllers/user-controller');
const checkPermissions = require('./../middlewares/acl');
const validator = require('./../middlewares/validator');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/').get(/*passportJWT,*/ userController.getAllUsers) /*.post(passportJWT, userController.createUser)*/;

router
  .route('/:id')
  .get(/*passportJWT,*/ userController.getUser)
  .put(
    passportJWT,
    checkPermissions([
      { permission: 'updateAnyUser' },
      { permission: 'updateOwnUser', own: { model: User, column: 'id' } },
    ]),
    validator({
      password: ['required', 'min:8', 'max:50'],
      email: ['required', 'email', 'unique:users:update'],
    }),
    userController.updateUser
  )
  .delete(
    /*passportJWT,
    checkPermissions([
      { permission: 'deleteAnyUser' },
      { permission: 'deleteOwnUser', own: { model: User, column: 'id' } },
    ]),*/
    userController.deleteUser
  );

module.exports = router;
