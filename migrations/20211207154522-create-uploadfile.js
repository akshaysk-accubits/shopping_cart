'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('products', 'uploadfile', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'No image' 
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('products', 'uploadfile')]);
  },
};