'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videojuego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Videojuego.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Videojuego',
    freezeTableName : true
  });

  Videojuego.associate = (models) => {
    Videojuego.belongsTo(models.Categoria, {
      foreignKey : 'id'
    });
  }

  return Videojuego;
};