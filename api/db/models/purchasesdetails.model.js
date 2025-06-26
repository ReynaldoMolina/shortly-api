const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const PURCHASESDETAILS_TABLE = 'ComprasDetalles';

const PurchasesDetailsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_compradet',
    type: DataTypes.INTEGER
  },
  purchaseId: {
    allowNull: false,
    field: 'Id_compra',
    type: DataTypes.INTEGER
  },
  productId: {
    allowNull: false,
    field: 'Id_producto',
    type: DataTypes.INTEGER
  },
  costPrice: {
    allowNull: false,
    field: 'Precio_costo',
    type: DataTypes.FLOAT,
  },
  quantity: {
    allowNull: false,
    field: 'Cantidad_compra',
    type: DataTypes.INTEGER
  }
};

class PurchasesDetails extends Model {
  static associate(models) {
    this.belongsTo(models.Purchases, {as: 'purchase'});
    this.belongsTo(models.Products, {as: 'product'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASESDETAILS_TABLE,
      modelName: 'PurchasesDetails',
      timestamps: false
    }
  }
};

module.exports = { PURCHASESDETAILS_TABLE, PurchasesDetailsSchema, PurchasesDetails };