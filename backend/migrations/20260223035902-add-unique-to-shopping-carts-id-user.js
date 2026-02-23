'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('shopping_carts', {
      fields: ['id_user'],
      type: 'unique',
      name: 'unique_user_cart'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('shopping_carts', 'unique_user_cart');
  }
};