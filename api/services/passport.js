const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const userModel = require('./../models/user-model');
const authConfig = require('./config').getAuth();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: authConfig.JWT.secret,
  passReqToCallback: true,
};

const googleOptions = {
  clientID: authConfig.google.id,
  clientSecret: authConfig.google.secret,
  passReqToCallback: true,
};

const facebookOptions = {
  clientID: authConfig.facebook.id,
  clientSecret: authConfig.facebook.secret,
  passReqToCallback: true,
};

const socialAccStrategy = (socialId) => {
  return async (req, accessToken, refreshToken, profile, done) => {
    try {
      const userSocialData = {[socialId]: profile.id};

      if (req.user) {
        const updatedUser = await userModel.update(req.user.id, userSocialData);
        return done(null, updatedUser);
      } else {
        const existingUser = await userModel.findOne({ email: profile.emails[0].value });

        if (!existingUser) {
          userSocialData['email'] = profile.emails[0].value;
          const newUser = await userModel.create(userSocialData);
          return done(null, newUser);
        }

        if (existingUser[socialId] === profile.id) {
          return done(null, existingUser);
        }

        const updatedUser = await userModel.update(existingUser.id, userSocialData);

        return done(null, updatedUser);
      }
    } catch (err) {
      done(err, false, err.message);
    }
  };
};

passport.use(
  new JwtStrategy(jwtOptions, async function (req, payload, done) {
    try {
      const user = await userModel.findById(payload.id);

      if (user) {
        return done(null, user);
      }

      req.user = user;

      return done(null, false);
    } catch (err) {
      done(err, false);
    }
  })
);

passport.use('googleToken', new GooglePlusTokenStrategy(googleOptions, socialAccStrategy('google_id')));

passport.use('facebookToken', new FacebookTokenStrategy(facebookOptions, socialAccStrategy('facebook_id')));
