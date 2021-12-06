'use strict';

const { getMaxListeners } = require("npmlog");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     
     await queryInterface.bulkInsert('user', [{
      id:2,
      email:'admin@gmail.com',
      password:'$2a$10$5sXv3CzUyu/FYVYOsI7lIeC8py0gjpj0oqM2gbin/GLAQwNoHKtD6',
      first_name: 'John',
      last_name:'wick',
      address:'wakanda',
      phone_number:'958621456',
      user_type:'2',
      created_at: new Date(),
      updated_at: new Date(),
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
