const joi = require("joi");

const searchProductsSchema = joi.object({
    search:joi.string(),
    sortByPrice: joi.string().valid('asc', 'desc').default('asc').optional(),
    sortByDate: joi.string().valid('asc', 'desc').default('asc').optional(),
    page: joi.number().default(1),
    size: joi.number().default(5),
});

module.exports = searchProductsSchema;
