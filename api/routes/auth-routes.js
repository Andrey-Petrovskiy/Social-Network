const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const authController = require('../controllers/auth-controller');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogleAuthenticate = passport.authenticate('googleToken', { session: false });
const passportGoogleAuthorize = passport.authorize('googleToken', { session: false });
const passportFacebookAuthenticate = passport.authenticate('facebookToken', { session: false });
const passportFacebookAuthorize = passport.authorize('facebookToken', { session: false });

router.route('/signup').post(authController.signUp);

router.route('/confirmation/:token').get(authController.confirmEmail);

router.route('/login').post(authController.login);

router.route('/oauth/google').post(passportGoogleAuthenticate, authController.googleOAuth);

router.route('/oauth/facebook').post(passportFacebookAuthenticate, authController.facebookOAuth);

router.route('/oauth/link/google').post(passportJWT, passportGoogleAuthorize, authController.linkGoogle);

router.route('/oauth/link/facebook').post(passportJWT, passportFacebookAuthorize, authController.linkFacebook);

router.route('/profile').get(passportJWT, authController.profile);

module.exports = router;
