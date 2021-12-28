
const jwt = require("jsonwebtoken");

const uservalidateToken = async (req, res, next) => {
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
      console.log(result);
      const userType = await result.user_type;
      console.log(userType);
      if(userType==1){
          next();
      }
      else 
      return res.status(500).json("No access!");

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


module.exports = { uservalidateToken };