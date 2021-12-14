"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class paymentDetails extends Model {
    static associate(models) {
      this.orderdetailsId = this.belongsTo(models.orderItems, {
        foreignKey: "orderItems_id",
      });
    }
  }
  paymentDetails.init(
    {
      total: DataTypes.DECIMAL(10, 2),
      provider: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "paymentDetails",
      freezeTableName: true,
      underscored: true,
    }
  );
  return paymentDetails;
};