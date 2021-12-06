const models = require("../../models/index");


module.exports ={ 
    getProducts : async (req, res) => {
    try {
      let { page, size } = req.query;
      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 10;
      }
      const limit = parseInt(size);
      const skip = (page - 1) * size;
  
      //list of users except the logged in user id
      const productList = await models.products.findAll()
       
        // .select(["email", "firstName", "lastName", "phoneNumber"])
  
        .limit(limit)
        .skip(skip);
        console.log(productList);
        then( productList => {
            res.status( 200 ).json( productList )
          })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }};