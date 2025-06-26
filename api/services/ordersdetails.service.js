const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registerName = 'Order detail';

class OrderDetailsService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.OrdersDetails.create(data);
    return newRegister;
  }

  async find() {
    const registers = await models.OrdersDetails.findAll();
    return registers;
  }

  async findOrder(id) {
    const registers = await models.OrdersDetails.findAll({
      where: {orderId: id}
    });
    if (!registers) {
      throw boom.notFound('Order not found');
    }
    return registers;
  }

  async update(id, changes) {
    const register = await models.OrdersDetails.findByPk(id);
    const data = await register.update(changes);
    return data;
  }

  async delete(id) {
    const register = await models.OrdersDetails.findByPk(id);
    await register.destroy();
    return { id };
  }
}

module.exports = OrderDetailsService;
