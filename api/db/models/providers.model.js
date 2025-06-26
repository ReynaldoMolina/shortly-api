const { types } = require('joi');
const { Model, DataTypes, Sequelize } = require('sequelize');
const PROVIDERS_TABLE = 'Proveedores';

const ProvidersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_proveedor',
    type: DataTypes.INTEGER
  },
  company: {
    allowNull: false,
    field: 'Nombre_empresa',
    type: DataTypes.STRING,
  },
  contact: {
    allowNull: false,
    field: 'Nombre_contacto',
    type: DataTypes.STRING,
  },
  phone: {
    field: 'Telefono',
    type: DataTypes.STRING,
  },
  city: {
    field: 'Departamento',
    type: DataTypes.STRING,
  },
  municipio: {
    field: 'Municipio',
    type: DataTypes.STRING,
  },
  country: {
    field: 'Pais',
    type: DataTypes.STRING,
  },
  address: {
    field: 'Direccion',
    type: DataTypes.STRING,
  }
};

class Providers extends Model {
  static associate(models) {
    this.hasMany(models.Purchases, {
      as: 'purchases',
      foreignKey: 'providerId'
    })
    this.hasMany(models.Expenses, {
      as: 'expenses',
      foreignKey: 'providerId'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVIDERS_TABLE,
      modelName: 'Providers',
      timestamps: false
    }
  }
};

module.exports = { PROVIDERS_TABLE, ProvidersSchema, Providers };