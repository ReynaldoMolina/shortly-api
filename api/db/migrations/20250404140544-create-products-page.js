'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ProductsPageSchema, PRODUCTSPAGE_TABLE } = require('../models/productspage.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCTSPAGE_TABLE, ProductsPageSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCTSPAGE_TABLE);
  }
};
