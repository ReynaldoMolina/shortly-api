const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const EXPENSES_TABLE = 'Egresos';

const ExpensesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_egreso',
    type: DataTypes.INTEGER
  },
  purchaseId: {
    field: 'Id_compra',
    type: DataTypes.INTEGER
  },
  providerId: {
    field: 'Id_proveedor',
    type: DataTypes.INTEGER
  },
  expenseDate: {
    allowNull: false,
    field: 'Fecha',
    type: DataTypes.DATEONLY
  },
  abono: {
    allowNull: false,
    field: 'Total',
    type: DataTypes.FLOAT,
  },
  concepto: {
    field: 'Concepto',
    type: DataTypes.STRING,
  },
};

class Expenses extends Model {
  static associate(models) {
    this.belongsTo(models.Purchases, {as: 'purchase'});
    this.belongsTo(models.Providers, {as: 'provider'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: EXPENSES_TABLE,
      modelName: 'Expenses',
      timestamps: false
    }
  }
};

module.exports = { EXPENSES_TABLE, ExpensesSchema, Expenses };