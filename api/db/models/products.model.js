const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIES_TABLE } = require('./categories.model');
const PRODUCTS_TABLE = 'Productos';

const ProductsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_producto',
    type: DataTypes.INTEGER
  },
  providerId: {
    allowNull: false,
    field: 'Id_proveedor',
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    field: 'Nombre',
    type: DataTypes.STRING,
  },
  description: {
    field: 'Descripcion',
    type: DataTypes.STRING,
  },
  costPrice: {
    allowNull: false,
    field: 'Precio_compra',
    type: DataTypes.FLOAT,
  },
  sellPrice: {
    allowNull: false,
    field: 'Precio_venta',
    type: DataTypes.FLOAT,
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Id_categoria',
    references: {
      model: CATEGORIES_TABLE,
      key: 'Id_categoria'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  addedDate: {
    field: 'Fecha_agregado',
    allowNull: false,
    type: DataTypes.DATEONLY
  },
  sheinId: {
    field: 'Id_shein',
    type: DataTypes.STRING
  },
};

class Products extends Model {
  static associate(models) {
    this.belongsTo(models.Categories, {as: 'category'});
    this.hasMany(models.OrdersDetails, {
      as: 'orderdetail',
      foreignKey: 'productId'
    });
    this.hasMany(models.PurchasesDetails, {
      as: 'purchasedetail',
      foreignKey: 'productId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Products',
      timestamps: false
    }
  }
};

module.exports = { PRODUCTS_TABLE, ProductsSchema, Products };