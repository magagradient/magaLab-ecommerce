'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('cart_items', {
      fields: ['id_cart', 'id_product'],
      type: 'unique',
      name: 'unique_cart_product'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cart_items', 'unique_cart_product');
  }
};