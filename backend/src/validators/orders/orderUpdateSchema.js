const Joi = require("joi");

const orderUpdateSchema = Joi.object({
    id_user: Joi.number().integer().positive().messages({
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`
    }),
    order_date: Joi.date().iso().messages({
        "date.base": `"order_date" debe ser una fecha válida.`,
        "date.format": `"order_date" debe tener formato ISO (YYYY-MM-DD).`
    }),
    total: Joi.number().positive().messages({
        "number.base": `"total" debe ser un número.`,
        "number.positive": `"total" debe ser un número positivo.`
    }),
    status: Joi.string().valid("pending", "paid", "canceled").messages({
        "any.only": `"status" debe ser 'pending', 'paid' o 'canceled'.`
    })
});

module.exports = orderUpdateSchema;
