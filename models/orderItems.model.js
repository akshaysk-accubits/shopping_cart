'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.cartitemId = this.belongsTo(models.cartItem, {
        foreignKey: 'cartItem_id',
      });
    }
  };
  order_items.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderItems',
  });
  return orderItems;
};