'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.userId = this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.productId = this.belongsTo(models.products, {
        foreignKey: 'product_id',
      });
    }
  };
  cartItem.init({
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'cartItem',
  });
  return cartItem;
};