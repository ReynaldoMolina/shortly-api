'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ORDERS_TABLE, OrdersSchema } = require('../models/orders.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(ORDERS_TABLE, 'Estado');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(ORDERS_TABLE, 'Estado', OrdersSchema.status);
  }
};
