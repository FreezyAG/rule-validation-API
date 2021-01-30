const Joi = require('@hapi/joi');

exports.schema = Joi.object({
  rule: Joi.object({
    field: Joi.string().required(),
    condition: Joi.string().required(),
    condition_value: Joi.any().required(),
  }).required(),

  data: Joi.any().required(),
});
