const Joi = require("joi");

const invoiceUpdateSchema = Joi.object({
    id_order: Joi.number().integer().positive()
        .messages({
            "number.base": `"id_order" debe ser un número.`,
            "number.integer": `"id_order" debe ser un número entero.`,
            "number.positive": `"id_order" debe ser un número positivo.`,
        }),
    invoice_number: Joi.string().trim().max(255)
        .messages({
            "string.base": `"invoice_number" debe ser una cadena de texto.`,
            "string.max": `"invoice_number" debe tener como máximo 255 caracteres.`,
        }),
    total_amount: Joi.number().precision(2).positive()
        .messages({
            "number.base": `"total_amount" debe ser un número.`,
            "number.positive": `"total_amount" debe ser un número positivo.`,
        }),
    issued_at: Joi.date().iso()
        .messages({
            "date.base": `"issued_at" debe ser una fecha válida.`,
            "date.format": `"issued_at" debe tener formato ISO (YYYY-MM-DD).`
        })
});

module.exports = invoiceUpdateSchema;
