const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const ORDERSDETAILS_TABLE = 'PedidosDetalles';

const OrdersDetailsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_detalle',
    type: DataTypes.INTEGER
  },
  orderId: {
    allowNull: false,
    field: 'Id_pedido',
    type: DataTypes.INTEGER
  },
  productId: {
    allowNull: false,
    field: 'Id_producto',
    type: DataTypes.INTEGER
  },
  sellPrice: {
    allowNull: false,
    field: 'Precio_venta',
    type: DataTypes.FLOAT,
  },
  costPrice: {
    allowNull: false,
    field: 'Precio_compra',
    type: DataTypes.FLOAT,
  },
  quantity: {
    allowNull: false,
    field: 'Cantidad_venta',
    type: DataTypes.INTEGER
  }
};

class OrdersDetails extends Model {
  static associate(models) {
    this.belongsTo(models.Orders, {as: 'order'});
    this.belongsTo(models.Products, {as: 'product'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERSDETAILS_TABLE,
      modelName: 'OrdersDetails',
      timestamps: false
    }
  }
};

module.exports = { ORDERSDETAILS_TABLE, OrdersDetailsSchema, OrdersDetails };