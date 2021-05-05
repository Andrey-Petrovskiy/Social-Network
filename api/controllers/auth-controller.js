const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./../models/user');
const catchAsync = require('./../errors/catch-async');
const sendEmail = require('./../services/node-mailer');
const signTokens = require('./../services/token.service');
const jwtConfig = require('./../services/config').getAuth().JWT;
const port = require('./../services/config').getPort();

exports.signUp = catchAsync(async (req, res, next) => {
  const props = { email: req.body.email, password: req.body.password };
  const user = await User.create(props);

  const tokens = signTokens(user);

  const url = `${req.protocol}://localhost:${port}/api/v1/auth/confirmation/${tokens.refresh.token}`;

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
    data: {
      user,
    },
    tokens,
  });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  const decodedToken = jwt.verify(req.params.token, jwtConfig.secret);
  const currentUser = await User.query().findById(decodedToken.id);

  await User.query().patchAndFetchById(currentUser.id, { email_confirmed: true });

  res.redirect(`${req.protocol}://localhost:${port}/api/v1/auth/login`);
});

exports.login = catchAsync(async (req, res, next) => {
  const verifiedUser = await User.verify(req.body.email, req.body.password);

  const tokens = signTokens(verifiedUser);
  const updatedUser = await User.query().patchAndFetchById(verifiedUser.id, { token: tokens.refresh.token });
  const { password, ...user } = updatedUser;

  res.status(200).json({
    status: 'success',
    user,
    tokens,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  const decodedToken = jwt.verify(refreshToken, jwtConfig.secret);

  await User.query().patchAndFetchById(decodedToken.id, { token: null });

  res.status(200).json({
    status: 'success',
  });
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  const decodedToken = jwt.verify(refreshToken, jwtConfig.secret);

  const userBeforeRefresh = await User.query().findById(decodedToken.id);
  const tokens = signTokens(userBeforeRefresh);
  const { password, ...user } = await User.query().patchAndFetchById(userBeforeRefresh.id, {
    token: tokens.refresh.token,
  });

  res.status(201).json({
    message: 'success',
    user,
    tokens,
  });
});

exports.googleOAuth = catchAsync(async (req, res, next) => {
  const tokens = await signTokens(req.user);
  const { password, ...user } = await User.query().patchAndFetchById(req.user.id, { token: tokens.refresh.token });

  res.status(200).json({
    message: 'google success',
    user,
    tokens,
  });
});

exports.facebookOAuth = catchAsync(async (req, res, next) => {
  const tokens = await signTokens(req.user);
  const { password, ...user } = await User.query().patchAndFetchById(req.user.id, { token: tokens.refresh.token });

  res.status(200).json({
    message: 'facebook success',
    user,
    tokens,
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
