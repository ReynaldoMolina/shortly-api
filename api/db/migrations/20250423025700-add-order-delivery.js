'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ORDERS_TABLE, OrdersSchema } = require('../models/orders.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(ORDERS_TABLE, 'Peso', OrdersSchema.weight);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(ORDERS_TABLE, 'Peso');
  }
};
