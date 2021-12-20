const models = require("../../models/index");

const Idcheck = async (productId) => {
  return models.products.findOne({ where: { id: productId } });
};

const cartProducts = async (limit, skip) => {
  return models.cartItem.findAndCountAll({include: [{
     model: models.products,
   }]},{
    limit: limit,
    skip: skip,
  });
};

const quantityUpdate = async (quantity, prodId) => {
  return models.cartItem.update(
    { quantity: quantity },
    { where: { id: prodId } }
  );
};

const deleteItem = async (productId) => {
  return models.cartItem.destroy(
    { where: { product_id: productId } }
  );
};

module.exports = { cartProducts, Idcheck, quantityUpdate, deleteItem };
