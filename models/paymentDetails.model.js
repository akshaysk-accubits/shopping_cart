'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paymentDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.orderdetailsId = this.belongsTo(models.orderItems, {
        foreignKey: 'orderItems_id',
      });
    }
  };
  paymentDetails.init({
    total: DataTypes.DECIMAL(10,2),
    provider: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'paymentDetails',
  });
  return paymentDetails;
};