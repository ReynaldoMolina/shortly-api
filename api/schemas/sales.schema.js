const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const clientId = Joi.number().integer();
const saleDate = Joi.date();
const abono = Joi.number();
const saldo = Joi.number();
const concepto = Joi.string();

const createSaleSchema = Joi.object({
    orderId: orderId.required(),
    clientId: clientId.required(),
    saleDate: saleDate.required(),
    abono: abono.required(),
    saldo: saldo.required(),
    concepto: concepto.allow('')
});

const updateSaleSchema = Joi.object({
    orderId,
    clientId,
    saleDate,
    abono: abono.required(),
    saldo: abono.required(),
    concepto: concepto.allow('')
});

const getSaleSchema = Joi.object({
    id: id.required()
});

const querySalesSchema = Joi.object({
    saleDate,
});

module.exports = { createSaleSchema, updateSaleSchema, getSaleSchema, querySalesSchema };
