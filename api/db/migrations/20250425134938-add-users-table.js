'use strict';

/** @type {import('sequelize-cli').Migration} */

const { UsersSchema, USERS_TABLE } = require('../models/users.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USERS_TABLE, UsersSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USERS_TABLE);
  }
};
