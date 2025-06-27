const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { nanoid } = require('nanoid');

const registerName = 'Url';

class UrlsService {
  constructor() {}

  async findOrCreate(url) {
    const [row, created] = await models.Urls.findOrCreate({
      where: { url },
      defaults: { id: nanoid(7), url },
    });
    return { row, created };
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
