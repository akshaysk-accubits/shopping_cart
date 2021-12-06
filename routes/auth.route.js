const express = require('express')
const router = express.Router()
const AuthController = require('../modules/auth/auth.controller')
const Validator = require("../middlewares/validation");
const register = require('../modules/user/user.controller').register;
const getProducts = require('../modules/auth/getProducts').getProducts;

router.post('/register',Validator("register"), register);

router.post('/login', Validator("login"), AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.put("/changePassword", Validator("changePassword"), AuthController.changePassword);

router.post("/forgotpassword", Validator("forgotPassword"), AuthController.forgotPassword);

router.put("/resetPassword", Validator("resetPassword"), AuthController.resetPassword);

router.get("/getProducts", getProducts)

router.delete('/logout', AuthController.logout)

module.exports = router;