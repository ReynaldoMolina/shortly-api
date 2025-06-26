const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();;
const price = Joi.number();
const image = Joi.string();

const createProductPageSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
});

const updateProductPageSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
});

const getProductPageSchema = Joi.object({
    id: id.required()
});

module.exports = { createProductPageSchema, updateProductPageSchema, getProductPageSchema };
