const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const { models } = require('../libs/sequelize');

const registerName = 'User';

class UsersService {
  constructor() {
    //
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newRegister = await models.Users.create({
      ...data,
      password: hash
    });
    delete newRegister.dataValues.password;
    return newRegister;
  }

  async find() {
    const registers = await models.Users.findAll({
      order: [['id', 'DESC']],
      attributes: {exclude: ['password']}
    });
    return registers;
  }

  async findByUsername(username) {
    const registers = await models.Users.findOne({
      where: { username }
    });
    return registers;
  }

  async findOne(id) {
    const register = await models.Users.findByPk(id);
    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }
    delete register.dataValues.password;
    return register;
  }

  async update(id, changes) {
    const register = await this.findOne(id);
    if (changes.password) {
      const hash = await bcrypt.hash(changes.password, 10);
      const data = await register.update({
        ...changes,
        password: hash
      });
      delete data.dataValues.password;
      return data;
    } else {
      const data = await register.update(changes);
      return data;
    }
  }

  async delete(id) {
    const register = await this.findOne(id)
    await register.destroy();
    return { id };
  }
}

module.exports = UsersService;
