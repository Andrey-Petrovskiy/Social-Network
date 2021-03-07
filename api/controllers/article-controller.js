const Article = require('./../models/article');
const User = require('./../models/user');
const catchAsync = require('./../errors/catch-async');
const AppError = require('./../errors/app-error');
const knex = Article.knex();

exports.getAllArticles = catchAsync(async (req, res, next) => {
  //TODO: rewrite into an Objection query

  /*const { id } = req.user;

  const selectFollowed = await User.basics().modify('selectFollowed', `${id}`);
  console.log(selectFollowed);

  const data = await knex.raw(`select articles.text, articles.updated_at
      from articles
      where (articles.user_id in
        (select followers.followed_id
        from users join followers on users.id = followers.follower_id
        where users.id=${id})
        and articles.visible_to='all')
      OR (articles.user_id in
        (select f1.followed_id
        from users
          join followers f1 on users.id=f1.follower_id
          join followers f2 on f1.follower_id=f2.followed_id and f1.followed_id=f2.follower_id
        where users.id=${id})
        and articles.visible_to='friends')
      order by articles.updated_at desc`);
  const articles = data.rows;*/

  const page = +req.query.page || 0;
  const limit = +req.query.limit || 10;
  const offset = page * limit;
  const count = await Article.query().count();

  const articles = await Article.query().limit(limit).offset(offset);

  res.status(200).json({
    status: 'success',
    data: articles,
    meta: {
      total: count,
      page: req.query.page || 1,
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
    article,
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const article = await Article.query().insert(props);

  res.status(201).json({
    status: 'success',
    article,
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const props = req.body;
  const id = req.params.id;
  console.log(id);
  console.log(props);
  const article = await Article.query().patchAndFetchById(id, props);

  if (!article) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    article,
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
