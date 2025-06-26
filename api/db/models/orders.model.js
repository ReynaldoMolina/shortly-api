const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const ORDERS_TABLE = 'Pedidos';

const OrdersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_pedido',
    type: DataTypes.INTEGER
  },
  clientId: {
    allowNull: false,
    field: 'Id_cliente',
    type: DataTypes.INTEGER
  },
  orderDate: {
    allowNull: false,
    field: 'Fecha_del_pedido',
    type: DataTypes.DATEONLY
  },
  weight: {
    field: 'Peso',
    type: DataTypes.FLOAT,
    allowNull: true
  },
  exchangeRate: {
    field: 'Cambio_dolar',
    type: DataTypes.FLOAT,
    allowNull: true
  },
  weightPrice: {
    field: 'Precio_libra',
    type: DataTypes.FLOAT,
    allowNull: true
  },
};

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.Clients, {as: 'client'});
    this.hasMany(models.OrdersDetails, {
      as: 'orderdetail', foreignKey: 'orderId'
    });
    this.hasMany(models.Sales, {
      as: 'sales', foreignKey: 'orderId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Orders',
      timestamps: false
    }
  }
};

module.exports = { ORDERS_TABLE, OrdersSchema, Orders };