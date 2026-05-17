'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payment_methods', [
      { method_name: 'mercadopago' },
      { method_name: 'stripe' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_methods', {
      method_name: ['mercadopago', 'stripe']
    });
  }
};