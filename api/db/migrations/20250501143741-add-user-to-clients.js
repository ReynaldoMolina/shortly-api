'use strict';

/** @type {import('sequelize-cli').Migration} */
const { CLIENTS_TABLE, ClientsSchema } = require('../models/clients.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CLIENTS_TABLE, 'Id_usuario', ClientsSchema.userId);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CLIENTS_TABLE, 'Id_usuario');
  }
};
