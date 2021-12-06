const { userExist } = require("./admin.validatetoken.service");
const jwt = require("jsonwebtoken");

const adminvalidateToken = async (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: process.env.VALIDATE_TOKEN_EXPIRE,
    };
    try {
      result = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, options);
      req.decoded = result;
      const user = await userExist(result);
      console.log(user);
      const type = await user.user_type;
      if (type !== 2){
        return next(createHttpError.BadRequest("Invalid User"));
      }

      next();
    } catch (err) {
        console.log(err);
      res.status(500).json("Invalid token!");
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401,
    };
    res.status(401).send(result);
  }
};


module.exports = { adminvalidateToken };