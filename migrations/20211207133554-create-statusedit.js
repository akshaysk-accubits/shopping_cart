'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('products', 'status', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '1'
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('products', 'status')]);
  },
};

//INACTIVE = 0
//ACTIVE = 1