const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string();
const password = Joi.string();
const role = Joi.string();
const pictureUrl = Joi.string();

const createUserSchema = Joi.object({
    username: username.required(),
    password: password.required(),
    role: role.required(),
    pictureUrl: pictureUrl.allow(''),
});

const updateUserSchema = Joi.object({
    username: username.required(),
    password,
    role,
    pictureUrl: pictureUrl.allow(''),
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
