const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const USERS_TABLE = 'Usuarios';

const UsersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_usuario',
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    field: 'Nombre_usuario',
    type: DataTypes.TEXT,
  },
  password: {
    field: 'Password',
    type: DataTypes.TEXT,
  },
  role: {
    field: 'Rol',
    type: DataTypes.TEXT,
  },
  pictureUrl: {
    field: 'Foto_url',
    type: DataTypes.TEXT
  },
};

class Users extends Model {
  static associate(models) {
    this.hasOne(models.Clients, {
      as: 'clients',
      foreignKey: 'userId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'Users',
      timestamps: false
    }
  }
};

module.exports = { USERS_TABLE, UsersSchema, Users };