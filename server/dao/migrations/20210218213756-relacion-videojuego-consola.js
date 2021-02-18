'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('Videojuego_Consola', { 
      consolaId: Sequelize.INTEGER,
      videojuegoId : Sequelize.INTEGER
    });
    
    await queryInterface.addConstraint('Videojuego_Consola', {
      fields : ['consolaId'],
      type : 'FOREIGN KEY',
      name : 'FK_Consola_Videojuego',
      references : {
        table : 'Consola',
        field : 'id'
      }
    });
    await queryInterface.addConstraint('Videojuego_Consola', {
      fields : ['videojuegoId'],
      type : 'FOREIGN KEY',
      name : 'FK_Videojuego_Consola',
      references : {
        table : 'Videojuego',
        field : 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeContraint('Videojuego_Consola', 
      'FK_Consola_Videojuego')
    await queryInterface.removeContraint('Videojuego_Consola', 
      'FK_Videojuego_Consola')
  }
};
