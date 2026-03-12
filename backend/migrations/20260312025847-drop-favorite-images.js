'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('favorite_images');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('favorite_images', {
      id_favorite_image: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_image: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  }
};