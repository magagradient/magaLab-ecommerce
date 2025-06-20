const Joi = require("joi");

const createCartItemSchema = Joi.object({
    id_cart: Joi.number().integer().positive().required()
        .messages({
            "number.base": `"id_cart" debe ser un número.`,
            "number.integer": `"id_cart" debe ser un número entero.`,
            "number.positive": `"id_cart" debe ser positivo.`,
            "any.required": `"id_cart" es obligatorio.`
        }),
    id_product: Joi.number().integer().positive().required()
        .messages({
            "number.base": `"id_product" debe ser un número.`,
            "number.integer": `"id_product" debe ser un número entero.`,
            "number.positive": `"id_product" debe ser positivo.`,
            "any.required": `"id_product" es obligatorio.`
        }),
    quantity: Joi.number().integer().positive().min(1)
        .messages({
            "number.base": `"quantity" debe ser un número.`,
            "number.integer": `"quantity" debe ser un número entero.`,
            "number.positive": `"quantity" debe ser mayor a cero.`,
        })
});

module.exports = createCartItemSchema;
