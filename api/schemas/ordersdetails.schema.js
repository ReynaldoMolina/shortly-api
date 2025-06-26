const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const sellPrice = Joi.number();
const costPrice = Joi.number();
const quantity = Joi.number().integer();

const createOrderDetailSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    sellPrice: sellPrice.required(),
    costPrice: sellPrice.required(),
    quantity: quantity.required(),
});

const updateOrderDetailSchema = Joi.object({
    orderId,
    productId,
    sellPrice,
    costPrice,
    quantity
});

const getOrderDetailSchema = Joi.object({
    id: id.required()
});

module.exports = { createOrderDetailSchema, updateOrderDetailSchema, getOrderDetailSchema };
