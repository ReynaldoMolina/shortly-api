const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const CATEGORIES_TABLE = 'Categoria_productos';

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_categoria',
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    field: 'Nombre_categoria',
    type: DataTypes.STRING
  }
};

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamps: false
    }
  }
};

module.exports = { CATEGORIES_TABLE, CategoriesSchema, Categories };