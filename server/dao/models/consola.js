'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consola extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Consola.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consola',
    freezeTableName : true
  });

  Consola.associate = (models) => {
    // Muchos a muchos
    // Consola --- Videojuego
    Consola.belongsToMany(models.Videojuego, {
      through : 'Videojuego_Consola',
      as : 'videojuegos',
      foreignKey : 'consolaId'
    });
  }

  return Consola;
};