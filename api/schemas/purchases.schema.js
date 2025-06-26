const Joi = require('joi');

const id = Joi.number().integer();
const providerId = Joi.number();
const purchaseDate = Joi.date();
const state = Joi.string();
const delivery = Joi.number();

const createPurchaseSchema = Joi.object({
    providerId: providerId.required(),
    purchaseDate: purchaseDate.required(),
    state: state.required(),
    delivery: delivery.allow('')
});

const updatePurchaseSchema = Joi.object({
    providerId: providerId.required(),
    purchaseDate,
    state,
    delivery: delivery.allow('')
});

const getPurchaseSchema = Joi.object({
    id: id.required()
});

module.exports = { createPurchaseSchema, updatePurchaseSchema, getPurchaseSchema };
