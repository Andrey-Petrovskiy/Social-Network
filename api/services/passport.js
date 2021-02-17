const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const userModel = require('./../models/user-model');
const authConfig = require('./config').getAuth();

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: authConfig.JWT.secret,
  passReqToCallback: true,
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

// Google OAuth Strategy
const googleOptions = {
  clientID: authConfig.google.id,
  clientSecret: authConfig.google.secret,
  passReqToCallback: true,
};

passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(googleOptions, async (req, accessToken, refreshToken, profile, done) => {
    try {
      if (req.user) {
        // User is logged in; linking social account id to the existing user
        const updatedUser = await userModel.update(req.user.id, { google_id: profile.id });
        return done(null, updatedUser);
      } else {
        const existingUser = await userModel.findOne({ email: profile.emails[0].value });

        if (!existingUser) {
          const newUser = await userModel.create({ email: profile.emails[0].value, google_id: profile.id });
          return done(null, newUser);
        }

        if (existingUser.google_id === profile.id) {
          return done(null, existingUser);
        }

        const updateParams = { google_id: profile.id };

        if (!existingUser.email_confirmed) {
          updateParams['password'] = null;
        }

        const updatedUser = await userModel.update(existingUser.id, updateParams);

        return done(null, updatedUser);
      }
    } catch (err) {
      done(err, false, err.message);
    }
  })
);

// Facebook OAuth Strategy
const facebookOptions = {
  clientID: authConfig.facebook.id,
  clientSecret: authConfig.facebook.secret,
  passReqToCallback: true,
};

passport.use(
  'facebookToken',
  new FacebookTokenStrategy(facebookOptions, async (req, accessToken, refreshToken, profile, done) => {
    try {
      if (req.user) {
        const updatedUser = await userModel.update(req.user.id, { facebook_id: profile.id });
        return done(null, updatedUser);
      } else {
        const existingUser = await userModel.findOne({ email: profile.emails[0].value });

        if (!existingUser) {
          const newUser = await userModel.create({ email: profile.emails[0].value, facebook_id: profile.id });
          return done(null, newUser);
        }

        if (existingUser.facebook_id === profile.id) {
          return done(null, existingUser);
        }

        const updateParams = { facebook_id: profile.id };

        if (!existingUser.email_confirmed) {
          updateParams['password'] = null;
        }

        const updatedUser = await userModel.update(existingUser.id, updateParams);

        return done(null, updatedUser);
      }
    } catch (err) {
      done(err, false, err.message);
    }
  })
);
