const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./../models/user');
const catchAsync = require('./../errors/catch-async');
const sendEmail = require('./../services/node-mailer');
const jwtConfig = require('./../services/config').getAuth().JWT;
const port = require('./../services/config').getPort();

const signToken = (user) => {
  return jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const props = { email: req.body.email, password: req.body.password };

  const user = await User.create(props);
  const token = signToken(user);

  const url = `${req.protocol}://localhost:${port}/api/v1/auth/confirmation/${token}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Confirmation email',
      html: `Please click this link to confirm your email: <a href="${url}">${url}<a/>`,
    });
  } catch (err) {
    console.log(err.message);
  }

  res.status(201).json({
    status: 'success',
    message: 'Registration successful',
    token,
    data: {
      user,
    },
  });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  const decodedToken = await promisify(jwt.verify)(req.params.token, jwtConfig.secret);
  const currentUser = await User.query().findById(decodedToken.id);
  await User.query().patchAndFetchById(currentUser.id, { email_confirmed: true });

  res.redirect(`${req.protocol}://localhost:${port}/api/v1/auth/login`);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.verify(email, password);

  const token = signToken(user);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.googleOAuth = catchAsync(async (req, res, next) => {
  const token = await signToken(req.user);

  res.status(200).json({
    message: 'google success',
    token,
  });
});

exports.facebookOAuth = catchAsync(async (req, res, next) => {
  const token = await signToken(req.user);

  res.status(200).json({
    message: 'facebook success',
    token,
  });
});

exports.linkGoogle = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    id: req.user.id,
    message: 'Successfully linked account with Google',
  });
});

exports.linkFacebook = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    id: req.user.id,
    message: 'Successfully linked account with Facebook',
  });
});

exports.profile = (req, res, next) => {
  res.status(200).json({
    data: 'profile',
  });
};

//TODO create profile route
