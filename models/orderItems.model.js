"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    static associate(models) {
      this.cartitemId = this.belongsTo(models.cartItem, {
        foreignKey: "cartItem_id",
      });
    }
  }
  orderItems.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "orderItems",
    }
  );
  return orderItems;
};
