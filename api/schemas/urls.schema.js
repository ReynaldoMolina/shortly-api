const Joi = require('joi');

const id = Joi.string();
const url = Joi.string();

const createUrlSchema = Joi.object({
  url: url.required(),
});

const getUrlSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUrlSchema, getUrlSchema };
