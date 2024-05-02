const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().min(1).required(),
  secondName: Joi.string().min(2).required(),
  age: Joi.number().min(0).max(120).required(),
  city: Joi.string().min(2),
});

module.exports = { schema };
