const models = require("../models/index");

const userExist = async (result) => {
  return models.user.findOne({ where: { id: result.id } });
};


module.exports = {
  userExist,
};
