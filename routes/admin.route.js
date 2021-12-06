const express = require('express')
const router = express.Router()
const AuthController = require('../modules/auth/auth.controller')
const Validator = require("../middlewares/validation");
const register = require('../modules/user/user.controller').register;
const addProducts = require('../modules/auth/addProduts').addProducts
const adminvalidateToken = require('../middlewares/admin.validateToken').adminvalidateToken

router.post('/register',Validator("register"), register);

router.post('/login', Validator("login"), AuthController.adminLogin)

router.post('/refresh-token', AuthController.refreshToken)

router.put("/changePassword", Validator("changePassword"), AuthController.changePassword);

router.post("/forgotpassword", Validator("forgotPassword"), AuthController.forgotPassword);

router.put("/resetPassword", Validator("resetPassword"), AuthController.resetPassword);

router.post('/addProducts', adminvalidateToken, addProducts)

router.delete('/logout', AuthController.logout)

module.exports = router;