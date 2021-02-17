const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const userModel = require('./../models/user-model');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');
const jwtConfig = require('./../services/config').getAuth().JWT;
const sendEmail = require('./../services/node-mailer');

const signToken = (user) => {
  return jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const props = { email: req.body.email, password: req.body.password };

  if (await userModel.findOne({ email: props.email })) {
    return next(new AppError('User with this email already exists', 401));
  }

  const user = await userModel.create(props);
  const token = signToken(user);

  const url = `http://localhost:4000/api/v1/auth/confirmation/${token}`;

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
  const currentUser = await userModel.findById(decodedToken.id);
  await userModel.update(currentUser.id, { email_confirmed: true });

  res.redirect('http://localhost:4000/api/v1/auth/login');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.verify(email, password);

  const token = signToken(user);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.googleOAuth = catchAsync(async (req, res, next) => {
  console.log('CONTROLLER ===== ', req.user);
  const token = await signToken(req.user);

  res.status(200).json({
    message: 'google success',
    token,
  });
});

exports.facebookOAuth = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const token = await signToken(req.user);

  res.status(200).json({
    message: 'facebook success',
    token,
  });
});

exports.linkGoogle = catchAsync(async (req, res, next) => {
  console.log('LINKING ACC ===== ', req.user);
  res.json({
    success: true,
    id: req.user.id,
    message: 'Successfully linked account with Google',
  });
});

exports.linkFacebook = catchAsync(async (req, res, next) => {
  res.json({
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
