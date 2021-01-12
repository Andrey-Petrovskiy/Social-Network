const express = require('express');
const knex = require('knex');

const DI = require('./services/di');
const config = require('./services/config');
const dbConnection = knex(config.getDBCredentials());

DI.setConfig(config);
DI.set('dbConnection', dbConnection);

const AppError = require('./errors/app-error');
const globalErrorHandler = require('./errors/global-error-handler');
const articleRouter = require('./routes/article-routes');
const userRouter = require('./routes/user-routes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

// Errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
