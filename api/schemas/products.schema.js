const Joi = require('joi');

const id = Joi.number().integer();
const providerId = Joi.number().integer();
const categoryId = Joi.number().integer();
const name = Joi.string().max(200);
const addedDate = Joi.date();
const costPrice = Joi.number();
const sellPrice = Joi.number();
const description = Joi.string().max(200);
const sheinId = Joi.string().max(40);

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
    providerId: providerId.required(),
    categoryId: categoryId.required(),
    name: name.required(),
    addedDate: addedDate.required(),
    costPrice: costPrice.required(),
    sellPrice: sellPrice.required(),
    description: description.allow(''),
    sheinId: sheinId.allow(''),
});

const updateProductSchema = Joi.object({
    providerId: providerId.required(),
    categoryId: categoryId.required(),
    name: name.required(),
    addedDate: addedDate.required(),
    costPrice: costPrice.required(),
    sellPrice: sellPrice.required(),
    description: description.allow(''),
    sheinId: sheinId.allow(''),
});

const getProductSchema = Joi.object({
    id: id.required()
});

const queryProductSchema = Joi.object({
    limit,
    offset,
    addedDate
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
