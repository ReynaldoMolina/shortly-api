const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const URLS_TABLE = 'Urls';

const UrlsSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.TEXT
  },
  url: {
    allowNull: false,
    unique: true,
    type: DataTypes.TEXT
  }
};

class Urls extends Model {
  static associate() {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: URLS_TABLE,
      modelName: 'Urls',
      timestamps: false
    }
  }
};

module.exports = { URLS_TABLE, UrlsSchema, Urls };