'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Productos.belongsToMany(models.Fabricantes, {through: 'Producto_Fabricante'})
      Productos.belongsToMany(models.Componentes, {through: 'Producto_Componente'})
    }
  }
  Productos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    pathImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Productos',
    tableName: 'Productos',
    timestamps: false
  });
  return Productos;
};