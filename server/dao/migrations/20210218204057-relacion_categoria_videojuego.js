'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Videojuego', {
      fields : ['categoriaId'],
      type : 'FOREIGN KEY',
      name : 'FK_Videojuego_Categoria',
      references : {
        table : 'Categoria',
        field : 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'Videojuego', 'FK_Videojuego_Categoria'
    );
  }
};
