const Joi = require("joi");

const ordersProductsUpdateSchema = Joi.object({
    quantity: Joi.number().integer().positive().required().messages({
        "number.base": `'quantity' debe ser un número.`,
        "number.integer": `'quantity' debe ser un número entero.`,
        "number.positive": `'quantity' debe ser un número positivo.`,
        "any.required": `'quantity' es obligatorio.`,
    }),
    unit_price: Joi.number().precision(2).positive().required().messages({
        "number.base": `'unit_price' debe ser un número.`,
        "number.positive": `'unit_price' debe ser un número positivo.`,
        "any.required": `'unit_price' es obligatorio.`,
    }),
});

module.exports = ordersProductsUpdateSchema;
