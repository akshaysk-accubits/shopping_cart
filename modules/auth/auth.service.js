const models = require("../../models/index");

const userExist = async (emailId) => {
  return models.user.findOne({ where: { email: emailId } });
};

const passwordExist = async (result) => {
  return models.user.findOne({ where: { id: result.id } });
};

const passwordUpdate = async (password) => {
  return models.user.update(
    { password: password },
    { where: { id: result.id } }
  );
};

module.exports = {
  userExist,
  passwordExist,
  passwordUpdate,
};
