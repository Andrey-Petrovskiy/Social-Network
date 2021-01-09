const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');
const Article = require('./../db/article');

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await Article.findAll();

  res.status(200).json({
    articles: articles.length,
    data: {
      articles,
    },
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const article = await Article.create(props);

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const article = await Article.findById(id);

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

exports.updateArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const id = req.params.id;
  const article = await Article.update(id, props);

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Article.remove(id);

  res.status(200).json({
    status: 'success',
    message: `Article ${id} deleted`,
  });
});
