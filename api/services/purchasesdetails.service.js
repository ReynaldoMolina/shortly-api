const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registerName = 'Purchase detail';

class PurchaseDetailsService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.PurchasesDetails.create(data);
    return newRegister;
  }

  async find() {
    const registers = await models.PurchasesDetails.findAll();
    return registers;
  }

  async findPurchase(id) {
    const register = await models.PurchasesDetails.findAll({
      where: {purchaseId: id}
    });
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

module.exports = PurchaseDetailsService;
