const Joi = require("joi");

const updateCartItemSchema = Joi.object({
    quantity: Joi.number().integer().positive().required()
        .messages({
            "number.base": `"quantity" debe ser un número.`,
            "number.integer": `"quantity" debe ser un número entero.`,
            "number.positive": `"quantity" debe ser mayor a cero.`,
            "any.required": `"quantity" es obligatorio.`
        })
});

module.exports = updateCartItemSchema;
