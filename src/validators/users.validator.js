const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your first name',
    }),

  lastName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your last name',
    }),

  email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input email',
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    })
});

module.exports = userValidationSchema;
