const express = require('express');

const AppError = require('./utils/app-error');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
      status: err.status,
      message: err.message
  });
});

module.exports = app;
