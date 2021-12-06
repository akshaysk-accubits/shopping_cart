'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('user', 'user_type', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '1'
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('user', 'user_type')]);
  },
};