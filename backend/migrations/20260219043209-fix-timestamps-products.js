'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cambiar created_at para que tenga DEFAULT CURRENT_TIMESTAMP
    await queryInterface.changeColumn('products', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    // Cambiar updated_at para que tenga DEFAULT CURRENT_TIMESTAMP y se actualice automáticamente
    await queryInterface.changeColumn('products', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir cambios en caso de rollback
    await queryInterface.changeColumn('products', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('products', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
