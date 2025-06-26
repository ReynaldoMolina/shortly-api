'use strict';

/** @type {import('sequelize-cli').Migration} */

const { USERS_TABLE, UsersSchema } = require('../models/users.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USERS_TABLE, 'Rol', UsersSchema.role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USERS_TABLE, 'Rol');
  }
};
