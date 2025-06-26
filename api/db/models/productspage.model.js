const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCTSPAGE_TABLE = 'ProductsPage';

const ProductsPageSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
};

class ProductsPage extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTSPAGE_TABLE,
      modelName: 'ProductsPage',
      timestamps: false
    }
  }
};

module.exports = { PRODUCTSPAGE_TABLE, ProductsPageSchema, ProductsPage };