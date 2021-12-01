const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const nodemailer = require("nodemailer");
const morgan = require("morgan");
require("dotenv").config();
require("./helpers/redis");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/refresh", require("./routes/auth.Route"));
//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error ", err);
  }
  console.log("Node.js is running at PORT", process.env.PORT);
});
