const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { nanoid } = require('nanoid');

const registerName = 'Url';

class UrlsService {
  constructor() {}

  async create(url) {
    const id = nanoid(7);
    try {
      return await models.Urls.create({id, url});
    } catch (error) {
      if (error.code === '23505') {
        error.statusCode = 503;
      }
      throw error;
    }
  }

  async getById(id) {
    const register = await models.Urls.findByPk(id);
    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }
    return register;
  }
}

module.exports = UrlsService;
