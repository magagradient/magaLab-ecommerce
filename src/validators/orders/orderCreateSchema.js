const Joi = require("joi");

const orderCreateSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`,
        "any.required": `"id_user" es obligatorio.`
    }),
    order_date: Joi.date().iso().messages({
        "date.base": `"order_date" debe ser una fecha válida.`,
        "date.format": `"order_date" debe tener formato ISO (YYYY-MM-DD).`
    }),
    total: Joi.number().positive().required().messages({
        "number.base": `"total" debe ser un número.`,
        "number.positive": `"total" debe ser un número positivo.`,
        "any.required": `"total" es obligatorio.`
    }),
    status: Joi.string().valid("pending", "paid", "canceled").messages({
        "any.only": `"status" debe ser 'pending', 'paid' o 'canceled'.`
    })
});

module.exports = orderCreateSchema;
