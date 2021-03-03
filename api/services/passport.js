const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const authConfig = require('./config').getAuth();
const User = require('./../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: authConfig.JWT.secret,
  passReqToCallback: true,
};

const googleOptions = {
  clientID: authConfig.google.clientID,
  clientSecret: authConfig.google.clientSecret,
  passReqToCallback: true,
};

const facebookOptions = {
  clientID: authConfig.facebook.clientID,
  clientSecret: authConfig.facebook.clientSecret,
  passReqToCallback: true,
};

const socialAccStrategy = (socialId) => {
  return async (req, accessToken, refreshToken, profile, done) => {
    try {
      const userSocialData = { [socialId]: profile.id };

      if (req.user) {
        const updatedUser = await User.query().patchAndFetchById(req.profile.id, userSocialData);

        return done(null, updatedUser);
      } else {
        const existingUser = await User.query().findOne({ email: profile.emails[0].value });

        if (!existingUser) {
          userSocialData['email'] = profile.emails[0].value;
          const newUser = await User.query().insert(userSocialData);
          return done(null, newUser);
        }

        if (existingUser[socialId] === profile.id) {
          return done(null, existingUser);
        }

        const updatedUser = await User.query().patchAndFetchById(existingUser.id, userSocialData);

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
      const user = await User.query().findById(payload.id);

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
