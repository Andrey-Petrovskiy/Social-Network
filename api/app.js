const express = require('express');
const cors = require('cors');

const DI = require('./services/di');
const config = require('./services/config');
DI.setConfig(config);
const dbSetup = require('./db-setup');
dbSetup();

const AppError = require('./errors/app-error');
const globalErrorHandler = require('./errors/global-error-handler');
const articleRouter = require('./routes/article-routes');
const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth-routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

// Errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
