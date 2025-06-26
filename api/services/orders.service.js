const boom = require('@hapi/boom');
const { Sequelize, col, Op, where } = require('sequelize');
const { models } = require('../libs/sequelize');

const registerName = 'Order';

class OrdersService {
  constructor() {
    //
  }

  async create(data) {
    const newRegister = await models.Orders.create(data);
    return newRegister;
  }

  async find(query) {
    const { debe } = query;
    const options = {
      order: [['id', 'DESC']],
      attributes: ['id', 'orderDate'],
      include: [
        {
          association: 'client',
          attributes: ['name', 'lastname']
        },
        {
          association: 'orderdetail',
          attributes: ['sellPrice', 'costPrice', 'quantity']
        },
        {
          association: 'sales',
          attributes: ['abono']
        }
      ]
    };

    const registers = await models.Orders.findAll(options);

    const processedRegisters = registers.map(register => {
      const fullname = `${register.client.name} ${register.client.lastname}`;
      const totalSell = register.orderdetail.reduce((sum, item) => sum + item.sellPrice * item.quantity, 0);
      const totalCost = register.orderdetail.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
      const abonos = register.sales.reduce((sum, item) => sum + item.abono, 0);
      
      return {
        id: register.id,
        orderDate: register.orderDate,
        fullname,
        totalSell: Math.round(totalSell * 100) / 100,
        abonos: Math.round(abonos * 100) / 100,
        saldo: Math.round((totalSell - abonos) * 100) / 100,
        profit: Math.round((totalSell - totalCost) * 100) / 100
      };
    });

    if (debe) {
      return processedRegisters.filter((register) => register.saldo > 0);
    }

    return processedRegisters;
  }

  async findOne(id) {
    const register = await models.Orders.findByPk(id, {
      include: [
        {
          association: 'client',
          attributes: ['name', 'lastname']
        },
        {
          association: 'orderdetail',
        },
        {
          association: 'sales',
          attributes: ['abono']
        }
      ]
    });
    if (!register) {
      throw boom.notFound(`${registerName} not found`);
    }

    const abonos = register.sales.reduce((sum, item) => sum + item.abono, 0);

    const processedRegister = {
      id: register.id,
      orderDate: register.orderDate,
      clientId: register.clientId,
      weight: register.weight,
      fullname: `${register.client.name} ${register.client.lastname}`,
      name: register.client.name,
      abonos,
      orderdetail: register.orderdetail
    };

    return processedRegister;
  }

  async findByUser(userId) {
    const options = {
      where: {
        '$client.Id_usuario$': userId
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'orderDate'],
      include: [
        {
          association: 'client',
          attributes: ['name', 'lastname'],
          include: [
            {
              association: 'user',
              attributes: ['id']
            }
          ]
        },
        {
          association: 'orderdetail',
          attributes: ['sellPrice', 'quantity']
        },
        {
          association: 'sales',
          attributes: ['abono']
        }
      ]
    };
    const registers = await models.Orders.findAll(options);

    const processedRegisters = registers.map(register => {
      const fullname = `${register.client.name} ${register.client.lastname}`;
      const totalSell = register.orderdetail.reduce((sum, item) => sum + item.sellPrice * item.quantity, 0);
      const abonos = register.sales.reduce((sum, item) => sum + item.abono, 0);
      
      return {
        id: register.id,
        orderDate: register.orderDate,
        fullname,
        totalSell: Math.round(totalSell * 100) / 100,
        abonos: Math.round(abonos * 100) / 100,
        saldo: Math.round((totalSell - abonos) * 100) / 100
      };
    });

    return processedRegisters;
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

module.exports = OrdersService;
