const express = require('express')
const router = express.Router()
const AuthController = require('../modules/auth/auth.controller')
const Validator = require("../middlewares/validation");
const {register} = require('../modules/user/user.controller');
const productController = require('../modules/products/product.controller');
const {uservalidateToken} = require('../middlewares/user.validateToken');
const cartController = require('../modules/cart/cart.controller');
const orderController = require('../modules/orderItems/orderItems.controller');

router.post('/register',Validator("register"), register);

router.post('/login', Validator("login"), AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.put("/changePassword", Validator("changePassword"), AuthController.changePassword);

router.post("/forgotpassword", Validator("forgotPassword"), AuthController.forgotPassword);

router.put("/resetPassword", Validator("resetPassword"), AuthController.resetPassword);

router.post("/getActiveproducts", uservalidateToken, Validator("searchProducts"), productController.getActiveproducts);

router.post("/searchProducts", uservalidateToken, Validator("searchProducts"),  productController.searchProducts);

router.post('/addCart', uservalidateToken, cartController.addCart);

router.post('/getCartItems', uservalidateToken,Validator("searchProducts"), cartController.getCartItems);

router.put("/cartUpdate", uservalidateToken, cartController.cartUpdate);

router.delete('/cartDelete', uservalidateToken, cartController.cartDelete);

router.delete('/logout', AuthController.logout);

module.exports = router;