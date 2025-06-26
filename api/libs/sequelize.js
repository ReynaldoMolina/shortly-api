const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('../db/models/index');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : console.log,
}

if (config.isProd) {
  options.dialectModule = require('pg');
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;