const boom = require('@hapi/boom');
const { Sequelize } = require('sequelize');
const { models } = require('../libs/sequelize');

const registerName = 'Sale';

class SalesService {
  constructor() {
    //       
  }

  async create(data) {
    const newRegister = await models.Sales.create(data);
    return newRegister;
  }

  async find(query) {
    const { saleDate } = query;
    const options = {
      order: [['id', 'DESC']],
      attributes: {exclude: ['clientId', 'concepto']},
      include: {
        association: 'client',
        attributes: ['name', 'lastname']
      }
    };

    if (saleDate) {
      options.where = {
        saleDate: saleDate
      }
    }

    const registers = await models.Sales.findAll(options);

    const processedRegisters = registers.map(register => {
      return {
        id: register.id,
        orderId: register.orderId,
        saleDate: register.saleDate,
        abono: Math.round(register.abono * 100) / 100,
        fullname: `${register.client.name} ${register.client.lastname}`
      }
    });

    if (saleDate) {
      const todayRegisters = processedRegisters.filter
      ((register) => register.saleDate === saleDate)
      return todayRegisters;
    }

    return processedRegisters;
  }

  async findOne(id) {
    const register = await models.Sales.findByPk(id, {
      include: {
        association: 'client',
        attributes: ['name', 'lastname']
      }
    });
    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }

    const processedRegister = {
      id: register.id,
      clientId: register.clientId,
      orderId: register.orderId,
      saleDate: register.saleDate,
      abono: Math.round(register.abono * 100) / 100,
      saldo: register.saldo,
      concepto: register.concepto,
      fullname: `${register.client.name} ${register.client.lastname}`
    }

    return processedRegister;
  }

  async update(id, changes) {
    const register = await models.Sales.findByPk(id);
    const data = await register.update(changes);
    return data;
  }

  async delete(id) {
    const register = await models.Sales.findByPk(id);
    await register.destroy();
    return { id };
  }
}

module.exports = SalesService;
