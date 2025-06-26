const Joi = require("joi");

const ordersProductsOnlyOrderParamSchema = Joi.object({
    id_order: Joi.number().integer().positive().required().messages({
        "number.base": `'id_order' debe ser un número`,
        "number.integer": `'id_order' debe ser un número entero`,
        "number.positive": `'id_order' debe ser un número positivo`,
        "any.required": `'id_order' es obligatorio`
    })
});

module.exports = ordersProductsOnlyOrderParamSchema;
