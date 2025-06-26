const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer().allow(null);
const name = Joi.string().max(50);
const lastname = Joi.string().max(50);
const phone = Joi.string().max(20);
const municipio = Joi.string().max(50);
const city = Joi.string().max(50);
const country = Joi.string().max(50);
const address = Joi.string().max(200);

const createClientSchema = Joi.object({
    userId,
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.allow(''),
    municipio: municipio.allow(''),
    city: city.allow(''),
    country: country.allow(''),
    address: address.allow(''),
});

const updateClientSchema = Joi.object({
    userId,
    name,
    lastname,
    phone: phone.allow(''),
    municipio: municipio.allow(''),
    city: city.allow(''),
    country: country.allow(''),
    address: address.allow(''),
});

const getClientSchema = Joi.object({
    id: id.required()
});

module.exports = { createClientSchema, updateClientSchema, getClientSchema };
