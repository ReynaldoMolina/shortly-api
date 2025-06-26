const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const PURCHASES_TABLE = 'Compras';

const PurchasesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_compra',
    type: DataTypes.INTEGER
  },
  providerId: {
    allowNull: false,
    field: 'Id_proveedor',
    type: DataTypes.INTEGER
  },
  purchaseDate: {
    allowNull: false,
    field: 'Fecha_compra',
    type: DataTypes.DATEONLY
  },
  state: {
    allowNull: false,
    field: 'Estado',
    type: DataTypes.STRING
  },
  delivery: {
    field: 'Envio',
    allowNull: false,
    type: DataTypes.FLOAT,
  },
};

class Purchases extends Model {
  static associate(models) {
    this.belongsTo(models.Providers, {as: 'provider'});
    this.hasMany(models.PurchasesDetails, {
      as: 'purchasedetail',
      foreignKey: 'purchaseId'
    });
    this.hasMany(models.Expenses, {
      as: 'expenses',
      foreignKey: 'purchaseId'
    });

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASES_TABLE,
      modelName: 'Purchases',
      timestamps: false
    }
  }
};

module.exports = { PURCHASES_TABLE, PurchasesSchema, Purchases };