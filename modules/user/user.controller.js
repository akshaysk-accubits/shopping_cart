const {sendMail} = require("../../helpers/mail");
const bcrypt = require("bcrypt");
const models = require("../../models/index");
const { emailExist, phoneNumberexist } = require("../user/user.service");
const saltRounds = 10;

module.exports = {
  register: async (req, res, next) => {
    let {
      first_name,
      last_name,
      email,
      address,
      password,
      phone_number,
      user_type,
    } = req.body;

    const usercount = await emailExist(email);
    if (usercount > 0) {
      return res.json({ message: "email already in use!" });
    }
    const numbercount = await phoneNumberexist(phone_number);
    if (numbercount > 0) {
      return res.json({ message: "phone number already in use!" });
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
      models.user
        .create({
          first_name,
          last_name,

          email,
          address,
          password: hash,
          phone_number,
          user_type,
        })
        .then(async (result) => {
          var mailParams = {
            to: email,
            subject: "Registration Successful",
            text: "Welcome!",
          };
          await sendMail(mailParams);
          res.status(200).json({
            message: "User created",
          });
        })
        .catch((err) => {
          console.log("Error", err);
          res.status(500).json({
            message: "error",
          });
        });
    });
  },
};
