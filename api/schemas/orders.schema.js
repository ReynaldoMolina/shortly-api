const Joi = require('joi');

const id = Joi.number().integer();
const clientId = Joi.number();
const orderDate = Joi.date();
const weight = Joi.number().allow(null);

const debe = Joi.bool();

const createOrderSchema = Joi.object({
    clientId: clientId.required(),
    orderDate: orderDate.required(),
    weight,
});

const updateOrderSchema = Joi.object({
    clientId,
    orderDate,
    weight,
});

const getOrderSchema = Joi.object({
    id: id.required()
});

const queryOrderSchema = Joi.object({
    debe
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, queryOrderSchema };
