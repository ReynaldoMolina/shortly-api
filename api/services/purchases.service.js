const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const registerName = 'Purchase';

class PurchasesService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.Purchases.create(data);
    return newRegister;
  }

  async find() {
    const registers = await models.Purchases.findAll({
      attributes: ['id', 'purchaseDate'],
      include: [
        {
          association: 'provider',
          attributes: ['company']
        },
        {
          association: 'purchasedetail',
          attributes: ['costPrice', 'quantity']
        },
        {
          association: 'expenses',
          attributes: ['abono']
        }
      ]
    });

    const processedRegisters = registers.map(register => {
      // const totalSell = register.purchasedetail.reduce((sum, item) => sum + item.sellPrice * item.quantity, 0);
      const totalCost = register.purchasedetail.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
      const abonos = register.expenses.reduce((sum, item) => sum + item.abono, 0);
      
      return {
        id: register.id,
        purchaseDate: register.purchaseDate,
        company: register.provider.company,
        totalCost,
        abonos,
        saldo: totalCost - abonos,
      };
    });

    return processedRegisters;
  }

  async findOne(id) {
    const register = await models.Purchases.findByPk(id);
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

module.exports = PurchasesService;
