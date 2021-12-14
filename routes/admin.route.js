const express = require('express')
const router = express.Router()
const AuthController = require('../modules/auth/auth.controller')
const Validator = require("../middlewares/validation");
const {register} = require('../modules/user/user.controller');
const productController = require('../modules/products/product.controller');
const {adminvalidateToken} = require('../middlewares/admin.validateToken');
const {upload} = require('../middlewares/uploadFile');
const cartController = require('../modules/cart/cart.controller');

router.post('/register',Validator("register"), register);

router.post('/login', Validator("login"), AuthController.adminLogin)

router.post('/refresh-token', AuthController.refreshToken)

router.put("/changePassword", Validator("changePassword"), AuthController.changePassword);

router.post("/forgotpassword", Validator("forgotPassword"), AuthController.forgotPassword);

router.put("/resetPassword", Validator("resetPassword"), AuthController.resetPassword);

router.post('/addProducts', adminvalidateToken,  productController.addProducts);

router.post('/getProducts', adminvalidateToken,Validator("searchProducts"), productController.getProducts);

router.put("/productStatus" , adminvalidateToken, productController.productStatus);

router.put("/productQuantity" , adminvalidateToken, productController.productQuantity);

router.put("/productPrice" , adminvalidateToken, productController.productPrice);

router.delete('/logout', AuthController.logout)

module.exports = router;