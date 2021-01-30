const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');
const articleModel = require('../models/article-model');

const getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await articleModel.findAll();

  res.status(200).json({
    articles: articles.length,
    data: {
      articles,
    },
  });
});

const getArticle = catchAsync(async (req, res, next) => {
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

const createArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const article = await articleModel.create(props);

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
});

const updateArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const id = req.params.id;
  const article = await articleModel.update(id, props);

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

const deleteArticle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await articleModel.remove(id);

  res.status(200).json({
    status: 'success',
    message: `Article ${id} deleted`,
  });
});

module.exports = { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle };
