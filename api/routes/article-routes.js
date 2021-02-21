const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const articleController = require('../controllers/article-controller');
const checkPermissions = require('./../middlewares/acl');
const passportJWT = passport.authenticate('jwt', { session: false });
const articleModel = require('./../models/article-model');

router.route('/').get(passportJWT, articleController.getAllArticles).post(passportJWT, articleController.createArticle);

router
  .route('/:id')
  .get(passportJWT, articleController.getArticle)
  .put(
    passportJWT,
    checkPermissions([
      { permission: 'updateAnyPost' },
      { permission: 'updateOwnPost', own: { model: articleModel, column: 'user_id' } },
    ]),
    articleController.updateArticle
  )
  .delete(
    passportJWT,
    checkPermissions([
      { permission: 'deleteAnyPost' },
      { permission: 'deleteOwnPost', own: { model: 'articleModel', column: 'user_id' } },
    ]),
    articleController.deleteArticle
  );

module.exports = router;
