const Joi = require("joi");

const ordersProductsCreateSchema = Joi.object({
    id_order: Joi.number().integer().positive().required().messages({
        "number.base": `'id_order' debe ser un número.`,
        "number.integer": `'id_order' debe ser un número entero.`,
        "number.positive": `'id_order' debe ser un número positivo.`,
        "any.required": `'id_order' es obligatorio.`,
    }),
    id_product: Joi.number().integer().positive().required().messages({
        "number.base": `'id_product' debe ser un número.`,
        "number.integer": `'id_product' debe ser un número entero.`,
        "number.positive": `'id_product' debe ser un número positivo.`,
        "any.required": `'id_product' es obligatorio.`,
    }),
    quantity: Joi.number().integer().positive().default(1).messages({
        "number.base": `'quantity' debe ser un número.`,
        "number.integer": `'quantity' debe ser un número entero.`,
        "number.positive": `'quantity' debe ser un número positivo.`,
    }),
    unit_price: Joi.number().precision(2).positive().required().messages({
        "number.base": `'unit_price' debe ser un número.`,
        "number.positive": `'unit_price' debe ser un número positivo.`,
        "any.required": `'unit_price' es obligatorio.`,
    }),
});

module.exports = ordersProductsCreateSchema;
