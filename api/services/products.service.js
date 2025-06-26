const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registerName = 'Product';

class ProductsService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.Products.create(data);
    return newRegister;
  }

  async find(query) {
    const { offset, limit, addedDate } = query;
    const options = {
      order: [['id', 'DESC']],
      attributes: ['id', 'name', 'costPrice', 'sellPrice']
    }

    if (offset && limit) {
      options.offset = offset;
      options.limit = limit;
    }

    if (addedDate) {
      options.where = {
        addedDate: addedDate
      }
    }

    const registers = await models.Products.findAll(options);
    return registers;
  }

  async findOne(id) {
    const register = await models.Products.findByPk(id);
    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }
    return register;
  }

  async update(id, changes) {
    const register = await this.findOne(id);
    const data = await register.update(changes);
    return data;
  }

  async delete(id) {
    const register = await this.findOne(id)
    await register.destroy();
    return { id };
  }
}

module.exports = ProductsService;
