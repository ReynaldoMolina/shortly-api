const boom = require('@hapi/boom');
const { Sequelize } = require('sequelize');
const { models } = require('../libs/sequelize');

const registerName = 'Client';

class ClientsService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.Clients.create(data);
    return newRegister;
  }

  async find() {
    const registers = await models.Clients.findAll({
      order: [['id', 'DESC']],
      attributes: [
        'id',
        [Sequelize.fn("CONCAT", Sequelize.col("Nombre"), " ", Sequelize.col("Apellido")), "fullname"],
        'phone'
      ]
    });
    return registers;
  }

  async findOne(id) {
    const register = await models.Clients.findByPk(id);
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

module.exports = ClientsService;
