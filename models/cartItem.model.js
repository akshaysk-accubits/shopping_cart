"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    static associate(models) {
      this.userId = this.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      this.productId = this.belongsTo(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  cartItem.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cartItem",
      freezeTableName: true,
      underscored: true,
    }
  );
  return cartItem;
};