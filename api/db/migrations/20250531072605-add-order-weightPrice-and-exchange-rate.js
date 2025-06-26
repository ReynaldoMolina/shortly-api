'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ORDERS_TABLE, OrdersSchema } = require('../models/orders.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(ORDERS_TABLE, 'Cambio_dolar', OrdersSchema.exchangeRate);
    await queryInterface.addColumn(ORDERS_TABLE, 'Precio_libra', OrdersSchema.weightPrice);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(ORDERS_TABLE, 'Cambio_dolar');
    await queryInterface.removeColumn(ORDERS_TABLE, 'Precio_libra');
  }
};
