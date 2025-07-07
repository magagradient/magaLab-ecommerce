'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user' // Por defecto, será 'user'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role');
  }
};
