const Joi = require("joi");

const createDownloadLinkSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "any.required": `"id_user" es obligatorio.`,
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`
    }),
    id_product: Joi.number().integer().positive().required().messages({
        "any.required": `"id_product" es obligatorio.`,
        "number.base": `"id_product" debe ser un número.`,
        "number.integer": `"id_product" debe ser un número entero.`,
        "number.positive": `"id_product" debe ser un número positivo.`
    }),
    download_url: Joi.string().uri().required().messages({
        "any.required": `"download_url" es obligatorio.`,
        "string.base": `"download_url" debe ser un texto.`,
        "string.uri": `"download_url" debe ser una URL válida.`
    }),
    expires_at: Joi.date().greater("now").required().messages({
        "any.required": `"expires_at" es obligatorio.`,
        "date.base": `"expires_at" debe ser una fecha.`,
        "date.greater": `"expires_at" debe ser una fecha futura.`
    }),
    used: Joi.boolean().optional()
});

module.exports = createDownloadLinkSchema;
