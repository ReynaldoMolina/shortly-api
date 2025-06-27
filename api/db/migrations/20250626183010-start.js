'use strict';

/** @type {import('sequelize-cli').Migration} */
const { UrlsSchema, URLS_TABLE } = require('../models/urls.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(URLS_TABLE, UrlsSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(URLS_TABLE);
  }
};
