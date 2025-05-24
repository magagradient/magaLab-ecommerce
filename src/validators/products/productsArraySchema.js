const Joi = require('joi');
const productSchema = require('./productCreateSchema');

const productsArraySchema = Joi.object({
    products: Joi.array()
        .items(productSchema)
        .min(1)
        .required()
        .messages({
            'array.base': `"products" debe ser un arreglo de productos`,
            'array.min': `"products" debe contener al menos un producto`,
            'any.required': `"products" es obligatorio`
        })
});

module.exports = productsArraySchema;