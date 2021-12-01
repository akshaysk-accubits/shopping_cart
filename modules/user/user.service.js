const models = require("../../models/index");

const emailExist = async (emailId) => {
  return models.user.count({ where: { email: emailId } });
};

const phoneNumberexist = async (phoneNumber) => {
  return models.user.count({ where: { phone_number: phoneNumber } });
};

module.exports = { emailExist, phoneNumberexist };
