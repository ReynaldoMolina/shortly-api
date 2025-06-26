const Joi = require('joi');

const id = Joi.number().integer();
const company = Joi.string().max(40);
const contact = Joi.string().max(40);
const phone = Joi.string().max(20);
const city = Joi.string().max(40);
const municipio = Joi.string().max(40);
const country = Joi.string().max(40);
const address = Joi.string().max(200);

const createProviderSchema = Joi.object({
    company: company.required(),
    contact: contact.required(),
    phone: phone.allow(''),
    municipio: municipio.allow(''),
    city: city.allow(''),
    country: country.allow(''),
    address: address.allow(''),
});

const updateProviderSchema = Joi.object({
    company: company.required(),
    contact: contact.required(),
    phone: phone.allow(''),
    city: city.allow(''),
    municipio: municipio.allow(''),
    country: country.allow(''),
    address: address.allow('')
});

const getProviderSchema = Joi.object({
    id: id.required()
});

module.exports = { createProviderSchema, updateProviderSchema, getProviderSchema };
