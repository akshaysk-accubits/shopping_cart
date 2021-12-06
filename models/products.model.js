"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {}
  }
  products.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.STRING,
      stock_quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
      freezeTableName: true,
      underscored: true,
    }
  );
  return products;
};
