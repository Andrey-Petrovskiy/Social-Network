const router = require('express').Router();
const passport = require('passport');
require('./../services/passport');

const articleController = require('../controllers/article-controller');
const validator = require('./../middlewares/validator');
const checkPermissions = require('./../middlewares/acl');
const passportJWT = passport.authenticate('jwt', { session: false });
const Article = require('./../models/article');

router
  .route('/')
  .get(/*passportJWT,*/ articleController.getAllArticles)
  .post(
    /*passportJWT,*/ validator({
      title: ['max:50'],
      text: ['required', 'min:1', 'max:2000'],
    }),
    articleController.createArticle
  );

router
  .route('/:id')
  .get(articleController.getArticle)
  .put(
    /*passportJWT,
    checkPermissions([
      { permission: 'updateAnyPost' },
      { permission: 'updateOwnPost', own: { model: Article, column: 'user_id' } },
    ]),*/ validator(
      {
        title: ['max:50'],
        text: ['required', 'min:1', 'max:2000'],
      }
    ),
    articleController.updateArticle
  )
  .delete(
    /*passportJWT,
    checkPermissions([
      { permission: 'deleteAnyPost' },
      { permission: 'deleteOwnPost', own: { model: Article, column: 'user_id' } },
    ]),*/
    articleController.deleteArticle
  );

module.exports = router;
