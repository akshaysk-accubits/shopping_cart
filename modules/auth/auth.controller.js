const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const sendMail = require("../../helpers/mail").sendMail;
const jwt = require("jsonwebtoken");
const client = require("../../helpers/redis");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt.helper");
const { userExist, passwordExist, passwordUpdate } = require("./auth.service");

module.exports = {
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "email is required!" });
      }
      if (!password) {
        return res.status(400).json({ message: "password is required!" });
      }
      const user = await userExist(email);
      const type = await user.user_type;
      if (type !== 1) {
        return next(createHttpError.BadRequest("Invalid User"));
      }
      if (!user) throw createHttpError.NotFound("User not registered");
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const accessToken = await signAccessToken(user.id, type);

          const refreshToken = await signRefreshToken(user.id, type);
          res
            .status(200)
            .json({ message: "Login successfull!", accessToken, refreshToken });
        } else {
          return next(createHttpError.BadRequest("Invalid Username/Password"));
        }
      }
    } catch (error) {
      next(error);
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "email is required!" });
      }
      if (!password) {
        return res.status(400).json({ message: "password is required!" });
      }
      const user = await userExist(email);
      const type = await user.user_type;
      if (type !== 2) {
        return next(createHttpError.BadRequest("Invalid User"));
      }
      if (!user) throw createHttpError.NotFound("User not registered");
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const accessToken = await signAccessToken(user.id, type);

          const refreshToken = await signRefreshToken(user.id, type);
          res
            .status(200)
            .json({ message: "Login successfull!", accessToken, refreshToken });
        } else {
          return next(createHttpError.BadRequest("Invalid Username/Password"));
        }
      }
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw createHttpError.BadRequest();

      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      result = jwt.verify(token, process.env.SECRET);
      const user = await passwordExist(result);
      console.log(user);
      const oldPassword = user.password;

      const { currentPassword } = req.body;
      const isExist = await bcrypt.compare(oldPassword, currentPassword);
      console.log(isExist);
      if (isExist) {
        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(req.body.password, salt);
        const userPassword = await passwordUpdate(password);
        return res.json({
          message: "password updated",
        });
      } else {
        res.status(400).json({
          message: "Enter correct current password",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userExist(email);
      if (user) {
        const token = jwt.sign(
          { id: user.id },
          process.env.RESET_PASSWORD_KEY,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );
        let mailParams = {
          to: email,
          subject: "Password Reset",
          text: `to reset, please click: ${process.env.FORGOT_PASSWORD_URL}${token} `,
        };
        console.log(mailParams);
        await sendMail(mailParams);
        res.status(200).json({
          message: "Password reset",
        });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: process.env.JWT_EXPIRE,
      };

      result = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
      req.decoded = result;

      if (token) {
        const user = await passwordExist(result);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        user.password = password;
        const userPassword = await passwordUpdate(password);
        return res.json({ message: "password updated!" });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Cannot change password!" });
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }
        console.log(val);
        res.sendStatus(204);
      });
    } catch (error) {
      next(error);
    }
  },
};
