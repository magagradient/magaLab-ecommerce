'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('product_images', 'image_type', {
      type: Sequelize.ENUM('cover', 'banner', 'gallery'),
      allowNull: false,
      defaultValue: 'gallery'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('product_images', 'image_type');
    
  }
};