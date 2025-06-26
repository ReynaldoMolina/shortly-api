const boom = require('@hapi/boom');
const { Sequelize, col } = require('sequelize');
const { models } = require('../libs/sequelize');

const registerName = 'Receipt';

class ReceiptsService {
  constructor() {
    //
  }

  async findOne(id) {
    const register = await models.Sales.findByPk(id, {
      attributes: {exclude: ['clientId', 'concepto']},
      include: [
        {
          association: 'client',
          attributes: ['name', 'lastname']
        }
      ]
    });

    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }

    const details = await models.OrdersDetails.findAll({
      where: {orderId: register.orderId},
      attributes: {exclude: ['orderId', 'productId', 'costPrice']},
      include: [
        {
          association: 'product',
          attributes: ['name']
        }
      ]
    });

    const processedDetail = details.map(detail => ({
      id: detail.id,
      sellPrice: detail.sellPrice,
      quantity: detail.quantity,
      productName: detail.product.name
    }));

    const processedRegister = {
      id: register.id,
      orderId: register.orderId,
      saleDate: register.saleDate,
      abono: register.abono,
      saldo: register.saldo,
      clientName: register.client.name,
      clientLastname: register.client.lastname,
      detail: processedDetail
    };

    return processedRegister;
  }

  async update(id, changes) {
    const register = await models.Orders.findByPk(id);
    const data = await register.update(changes);
    return data;
  }
  
  async delete(id) {
    const register = await models.Orders.findByPk(id);
    await register.destroy();
    return { id };
  }
}

module.exports = ReceiptsService;
