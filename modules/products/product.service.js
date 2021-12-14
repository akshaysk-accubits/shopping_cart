const models = require("../../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const findProducts = async (limit, skip) => {
  return models.products.findAndCountAll({
    limit: limit,
    skip: skip,
  });
};

const activeProducts = async (limit, skip, sortByPrice, sortByDate) => {
  return await models.products.findAndCountAll({
    where: { status: 1 },
    attributes: ["name", "desc", "price", "status", "stock_quantity"],
    limit: limit,
    skip: skip,
    order: [
      ["price", sortByPrice],
      ["created_at", sortByDate],
    ],
  });
};

const searchList = async (search, limit, skip, sortByPrice, sortByDate) => {
  return await models.products.findAndCountAll({
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
    attributes: ["name", "desc", "price", "status", "stock_quantity"],
    limit: limit,
    skip: skip,
    order: [
      ["price", sortByPrice],
      ["created_at", sortByDate],
    ],
  });
};

const Idcheck = async (productId) => {
  return models.products.findOne({ where: { id: productId } });
};

const statusUpdate = async (status, prodId) => {
  return models.products.update({ status: status }, { where: { id: prodId } });
};

const historyUpdate = async (quantity, prodId) => {
  return models.history.create({
    stock_history: quantity,
    products_id: prodId,
  });
};

const quantityUpdate = async (quantity, prodId) => {
  return models.products.update(
    { stock_quantity: quantity },
    { where: { id: prodId } }
  );
};

const priceUpdate = async (price, prodId) => {
  return models.products.update({ price: price }, { where: { id: prodId } });
};

module.exports = {
  findProducts,
  activeProducts,
  statusUpdate,
  Idcheck,
  quantityUpdate,
  historyUpdate,
  priceUpdate,
  searchList,
};
