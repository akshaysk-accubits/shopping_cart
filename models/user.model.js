"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.BIGINT,
      user_type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
      freezeTableName: true,
      underscored: true,
    }
  );
  return User;
};