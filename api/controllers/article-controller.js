const Article = require('./../models/article');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await Article.query().withGraphFetched('user');

  res.status(200).json({
    articles: articles.length,
    data: {
      articles,
    },
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const article = await Article.query().findById(id);

  if (!article) {
    return next(new AppError('No article found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const article = await Article.query().insert(props);

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const id = req.params.id;

  const article = await Article.query().patchAndFetchById(id, props);

  if (!article) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const article = await Article.query().deleteById(id);

  if (!article) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `article ${id} deleted`,
  });
});
