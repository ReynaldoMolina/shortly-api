const Joi = require('joi');

const id = Joi.number().integer();
const purchaseId = Joi.number().integer();
const providerId = Joi.number().integer();
const expenseDate = Joi.date();
const abono = Joi.number();
const concepto = Joi.string();

const createExpenseSchema = Joi.object({
  purchaseId: purchaseId.required(),
  providerId: providerId.required(),
  expenseDate: expenseDate.required(),
  abono,
  concepto
});

const updateExpenseSchema = Joi.object({
  purchaseId,
  providerId,
  expenseDate,
  abono,
  concepto,
});

const getExpenseSchema = Joi.object({
  id: id.required()
});

module.exports = { createExpenseSchema, updateExpenseSchema, getExpenseSchema };
