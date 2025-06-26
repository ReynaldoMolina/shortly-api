const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registerName = 'Provider';

class ProvidersService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.Providers.create(data);
    return newRegister;
  }

  async find() {
    const registers = await models.Providers.findAll({
      order: [['id', 'ASC']],
      attributes: ['id', 'company', 'phone']
    });
    return registers;
  }

  async findOne(id) {
    const register = await models.Providers.findByPk(id);
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

module.exports = ProvidersService;
