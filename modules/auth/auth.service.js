const models = require("../../models/index");

const userExist = async (emailId) => {
  return models.user.findOne( { where: { email: emailId } });
};

module.exports = { userExist };