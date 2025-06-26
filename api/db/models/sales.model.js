const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const SALES_TABLE = 'Ventas';

const SalesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_venta',
    type: DataTypes.INTEGER
  },
  orderId: {
    allowNull: false,
    field: 'Id_pedido',
    type: DataTypes.INTEGER
  },
  clientId: {
    allowNull: false,
    field: 'Id_cliente',
    type: DataTypes.INTEGER
  },
  saleDate: {
    allowNull: false,
    field: 'Fecha',
    type: DataTypes.DATEONLY
  },
  abono: {
    allowNull: false,
    field: 'Abono',
    type: DataTypes.FLOAT
  },
  saldo: {
    allowNull: false,
    field: 'Saldo',
    type: DataTypes.FLOAT
  },
  concepto: {
    field: 'Concepto',
    type: DataTypes.STRING
  },
};

class Sales extends Model {
  static associate(models) {
    this.belongsTo(models.Orders, {as: 'order'});
    this.belongsTo(models.Clients, {as: 'client'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: SALES_TABLE,
      modelName: 'Sales',
      timestamps: false
    }
  }
};

module.exports = { SALES_TABLE, SalesSchema, Sales };