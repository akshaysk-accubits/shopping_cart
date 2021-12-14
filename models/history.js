'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.products_id = this.belongsTo(models.products, {
        foreignKey: "products_id",
      });
      // define association here
    }
  };
  history.init({
    products_id: DataTypes.INTEGER,
    stock_history:DataTypes.INTEGER,
    price_history: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'history',
    freezeTableName: true,
      underscored: true,
  });
  return history;
};