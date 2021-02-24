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
    await queryInterface.bulkInsert('Consola', [
      {
        nombre : "PS5",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nombre : "Switch",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nombre : "PC",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nombre : "PS4",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Consola', null);
  }
};
