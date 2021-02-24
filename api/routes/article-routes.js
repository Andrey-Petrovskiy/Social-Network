const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const articleController = require('../controllers/article-controller');
const checkPermissions = require('./../middlewares/acl');
const passportJWT = passport.authenticate('jwt', { session: false });
const Article = require('./../models/article');

router.route('/').get(articleController.getAllArticles).post(/*passportJWT,*/ articleController.createArticle);

router
  .route('/:id')
  .get(articleController.getArticle)
  .put(
    /*passportJWT,
    checkPermissions([
      { permission: 'updateAnyPost' },
      { permission: 'updateOwnPost', own: { model: Article, column: 'user_id' } },
    ]),*/
    articleController.updateArticle
  )
  .delete(
    /*passportJWT,
    checkPermissions([
      { permission: 'deleteAnyPost' },
      { permission: 'deleteOwnPost', own: { model: 'User', column: 'user_id' } },
    ]),*/
    articleController.deleteArticle
  );

module.exports = router;
