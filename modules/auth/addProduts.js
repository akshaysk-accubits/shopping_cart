const models = require("../../models/index");
  
  
  module.exports = {
    
        addProducts: async (req, res, next) => {
            try {
          let {
            name, desc, price, stock_quantity
          } = req.body;
            models.products
              .create({
                name, desc, price, stock_quantity
              }) 
                return res.status(200).json({
                  message: "product added",
                });
              }
              catch (error) {
                console.log("Error", err);
                res.status(500).json({
                  message: "error",
                });
              }
              }
            }
        