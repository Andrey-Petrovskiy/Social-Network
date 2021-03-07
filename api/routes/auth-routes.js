const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const authController = require('../controllers/auth-controller');
const validator = require('./../middlewares/validator');
const PASSWORD_REQUIREMENTS = ['required', 'min:8', 'max:50'];
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogleAuthenticate = passport.authenticate('googleToken', { session: false });
const passportGoogleAuthorize = passport.authorize('googleToken', { session: false });
const passportFacebookAuthenticate = passport.authenticate('facebookToken', { session: false });
const passportFacebookAuthorize = passport.authorize('facebookToken', { session: false });

router.route('/signup').post(
  validator({
    email: ['required', 'email', 'unique:users:create'],
    password: PASSWORD_REQUIREMENTS,
  }),
  authController.signUp
);

router.route('/confirmation/:token').get(authController.confirmEmail);

router.route('/login').post(
  validator({
    email: ['required', 'email'],
    password: PASSWORD_REQUIREMENTS,
  }),
  authController.login
);

router.route('/oauth/google').post(passportGoogleAuthenticate, authController.googleOAuth);

router.route('/oauth/facebook').post(passportFacebookAuthenticate, authController.facebookOAuth);

router.route('/oauth/link/google').post(passportJWT, passportGoogleAuthorize, authController.linkGoogle);

router.route('/oauth/link/facebook').post(passportJWT, passportFacebookAuthorize, authController.linkFacebook);

router.route('/profile').get(passportJWT, authController.profile);

module.exports = router;
