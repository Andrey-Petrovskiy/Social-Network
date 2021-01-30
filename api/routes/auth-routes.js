const express = require('express');
const passport = require('passport');
const router = express.Router();
const { login, signUp } = require('../controllers/auth-controller');

router.route('/signup').post(signUp);

router.route('/login').post(login);

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = router;
