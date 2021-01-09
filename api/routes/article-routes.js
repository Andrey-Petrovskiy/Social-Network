const router = require('express').Router();
const {
  getAllArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article-controller');

router.route('/').get(getAllArticles).post(createArticle);

router.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
