const articleModel = require('../models/article-model');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await articleModel.findAll();

  res.status(200).json({
    articles: articles.length,
    data: {
      articles,
    },
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const article = await articleModel.findById(id);

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
  const article = await articleModel.create(props);

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
  const article = await articleModel.update(id, props);

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
  const article = await articleModel.remove(id);

  if (!article) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Article ${id} deleted`,
  });
});
