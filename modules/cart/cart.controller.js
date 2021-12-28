const models = require("../../models/index");
const {
  cartProducts,
  Idcheck,
  quantityUpdate,
  deleteItem,
} = require("./cart.service");
const jwt = require("jsonwebtoken");

module.exports = {
  addCart: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: process.env.JWT_EXPIRE,
      };
      result = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, options);
      req.decoded = result;

      const user_id = await result.id;
      console.log(user_id);
      let { product_id, quantity } = req.body;
      models.cartItem.create({
        user_id,
        product_id,
        quantity,
      });
      return res.status(200).json({
        message: "Added to cart",
      });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({
        message: "error",
      });
    }
  },
  getCartItems: async (req, res) => {
    try {
      let { page, size } = req.body;
      const limit = parseInt(size);
      const skip = (page - 1) * size;

      const cartList = await cartProducts(limit, skip);
      console.log(cartList);
      res.send({
        page,
        size,
        data: cartList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  cartUpdate: async (req, res, next) => {
    let { quantity, productId } = req.body;
    try {
      const idExist = await Idcheck(productId);

      const prodId = idExist.id;
      if (idExist) {
        const quantityEdit = await quantityUpdate(quantity, prodId);
        return res.json({ message: "cart updated!" });
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
  cartDelete: async (req, res, next) => {
    let { productId } = req.body;
    try {
      const idExist = await Idcheck(productId);
      const prodId = idExist.id;
      if (idExist) {
        const deleteCart = await deleteItem(productId);
        return res.json({ message: "item removed!" });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Cannot remove!" });
    }
  },
};
