const models = require("../../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  statusUpdate,
  Idcheck,
  quantityUpdate,
  findProducts,
  activeProducts,
  searchList,
  historyUpdate,
  priceUpdate,
} = require("../products/product.service");

module.exports = {
  addProducts: async (req, res, next) => {
    try {
      let { name, desc, price, status, stock_quantity } = req.body;
      models.products.create({
        name,
        desc,
        price,
        status,
        stock_quantity,
      });
      // if (req.file) {
      //   userData.profileImage = req.file.filename;
      //   logger.info("req.file", req.file);
      // }
      return res.status(200).json({
        message: "product added",
      });
    } catch (error) {
      console.log("Error", err);
      res.status(500).json({
        message: "error",
      });
    }
  },

  getProducts: async (req, res) => {
    try {
      let { page, size } = req.body;
      const limit = parseInt(size);
      const skip = (page - 1) * size;

      const productList = await findProducts(limit, skip);
      console.log(productList);
      res.send({
        page,
        size,
        data: productList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getActiveproducts: async (req, res) => {
    try {
      let { sortByPrice, sortByDate } = req.body;
      let { page, size } = req.body;
      const limit = parseInt(size);
      const skip = (page - 1) * size;

      const activeList = await activeProducts(
        limit,
        skip,
        sortByPrice,
        sortByDate
      );
      res.send({
        page,
        size,
        data: activeList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  searchProducts: async (req, res) => {
    try {
      let { search } = req.body;
      console.log(search);
      let { sortByPrice, sortByDate } = req.body;
      let { page, size } = req.body;
      const limit = parseInt(size);
      const skip = (page - 1) * size;
      const productList = await searchList(
        search,
        limit,
        skip,
        sortByPrice,
        sortByDate
      );
      res.send({
        page,
        size,
        data: productList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  productStatus: async (req, res, next) => {
    let { status, productId } = req.body;
    try {
      const idExist = await Idcheck(productId);

      const prodId = idExist.id;
      if (idExist) {
        const statusEdit = await statusUpdate(status, prodId);
        return res.json({ message: "status updated!" });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Cannot update!" });
    }
  },
  productQuantity: async (req, res, next) => {
    let { quantity, productId } = req.body;
    try {
      const idExist = await Idcheck(productId);

      const prodId = idExist.id;
      if (idExist) {
        const quantityEdit = await quantityUpdate(quantity, prodId);
        const history = await historyUpdate(quantity, prodId);
        return res.json({ message: "quantity updated!" });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Cannot update!" });
    }
  },
  productPrice: async (req, res, next) => {
    let { price, productId } = req.body;
    try {
      const idExist = await Idcheck(productId);

      const prodId = idExist.id;
      if (idExist) {
        const priceEdit = await priceUpdate(price, prodId);

        return res.json({ message: "price updated!" });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Cannot update!" });
    }
  },
};
