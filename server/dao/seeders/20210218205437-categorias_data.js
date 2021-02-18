'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Categoria', [
     {
       nombre : 'FPS',
       estado : 1,
       createdAt : new Date(),
       updatedAt : new Date()
     }, {
       nombre : 'RPG',
       estado : 1,
       createdAt : new Date(),
       updatedAt : new Date()
     }, {
       nombre : '2D Platformer',
       estado : 1,
       createdAt : new Date(),
       updatedAt : new Date()
     }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categoria', null);
  }
};
