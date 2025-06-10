const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your first name',
    }),

  middleName: Joi.string()
  .allow('')
  .messages({
    'string.empty': 'Please input your middle name',
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

  phoneNumber: Joi.string()
    .required()
    .messages({
      'string.empty': 'Phone number is required',
    }),

  location: Joi.string()
    .required()
    .messages({
      'string.empty': 'Location is required',
    }),

  dateOfBirth: Joi.date()
    .required()
    .messages({
      'string.empty': 'Location is required',
    }),

  gpsCode: Joi.string()
    .required()
    .messages({
      'string.empty': 'gpsCode is required',
 }),

 city: Joi.string()
    .required()
    .messages({
      'string.empty': 'city is required',
 }),

region: Joi.string()
    .required()
    .messages({
      'string.empty': 'region is required',
 }),

 profession: Joi.string()
    .required()
    .messages({
      'string.empty': 'profession is required',
 }),

workPlace: Joi.string()
    .required()
    .messages({
      'string.empty': 'workPlace is required',
}),

carNumber: Joi.string()
    .required()
    .messages({
      'string.empty': 'carNumber is required',
}),

selfImage: Joi.string()
    .required()
    .messages({
      'string.empty': 'selfImage is required',
}),

carImage: Joi.string()
    .required()
    .messages({
      'string.empty': ' carImage is required',
}),


ghanaCardFront: Joi.string()
    .required()
    .messages({
      'string.empty': 'ghanaCardFront is required',
}),


ghanaCardBack: Joi.string()
    .required()
    .messages({
      'string.empty': 'ghanaCardBack is required',
}),

 
});

module.exports = userValidationSchema;
