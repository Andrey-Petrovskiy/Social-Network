const knex = require('knex');
const knexfile = require('./../knexfile');
const db = knex(knexfile.development);
const AppError = require('./../errors/app-error');
const catchAsync = require('./../errors/catch-async');

module.exports = (validatorSchema) => {
  return catchAsync(async (req, res, next) => {
    const errors = [];

    for (const [fieldName, rules] of Object.entries(validatorSchema)) {
      for (const rule of rules) {
        const [ruleCategory, ...params] = rule.split(':');

        switch (ruleCategory) {
          case 'required':
            if (!req.body[fieldName]) {
              errors.push(`${fieldName} is missing`);
            }

            break;
          case 'min':
            if (!req.body[fieldName]) {
              break;
            }

            const min = parseInt(params[0], 10);

            if (req.body[fieldName].length < min) {
              errors.push(`${fieldName} length should be at least ${min} characters`);
            }

            break;
          case 'max':
            if (!req.body[fieldName]) {
              break;
            }

            const max = parseInt(params[0], 10);

            if (req.body[fieldName].length > max) {
              errors.push(`${fieldName} length should not exceed ${max} characters`);
            }

            break;
          case 'email':
            if (!req.body[fieldName]) {
              break;
            }

            const validateEmail = (email) => {
              const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              return regex.test(email);
            };

            if (!validateEmail(req.body.email)) {
              errors.push(`${fieldName} is not valid`);
            }

            break;
          case 'unique':
            if (!req.body[fieldName]) {
              break;
            }

            const candidate = req.body[fieldName];
            const id = parseInt(req.params.id);
            const dbResult = await db.select().from(params[0]).where(fieldName, candidate).first();

            if (params[1] === 'create' && dbResult) {
              errors.push(`${fieldName} already exists`);
            } else if (params[1] === 'update' && dbResult?.id !== id) {
              errors.push(`${fieldName} already exists`);
            }

            break;
        }
      }
    }

    const errMessage = errors.join('; ');

    if (errors.length) {
      return next(new AppError(`${errMessage}`, 422));
    } else {
      return next();
    }
  });
};
