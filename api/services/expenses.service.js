const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registerName = 'Expense';

class ReceiptsService {
  constructor() {
    //      
  }

  async create(data) {
    const newRegister = await models.Expenses.create(data);
    return newRegister;
  }

  async find() {
    const registers = await models.Expenses.findAll({
      attributes: {exclude: ['providerId', 'concepto']},
      include: [{
        association: 'provider',
        attributes: ['company']
      }]
    });

    const processedRegisters = registers.map(register => {
      return {
        id: register.id,
        purchaseId: register.purchaseId,
        expenseDate: register.expenseDate,
        abono: register.abono,
        concepto: register.concepto,
        provider: register.provider.company
      }
    });

    return processedRegisters;
  }

  async findOne(id) {
    const register = await models.Expenses.findByPk(id, {
      attributes: {exclude: ['providerId']},
      include: [{
        association: 'provider',
        attributes: ['company']
      }]
    });
    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }

    const processedRegister = {
      id: register.id,
      purchaseId: register.purchaseId,
      expenseDate: register.expenseDate,
      abono: register.abono,
      concepto: register.concepto,
      provider: register.provider.company
    }

    return processedRegister;
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

module.exports = ReceiptsService;
