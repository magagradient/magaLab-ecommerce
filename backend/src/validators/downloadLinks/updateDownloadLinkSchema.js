const Joi = require("joi");

const updateDownloadLinkSchema = Joi.object({
    id_user: Joi.number().integer().positive().messages({
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`
    }),
    id_product: Joi.number().integer().positive().messages({
        "number.base": `"id_product" debe ser un número.`,
        "number.integer": `"id_product" debe ser un número entero.`,
        "number.positive": `"id_product" debe ser un número positivo.`
    }),
    download_url: Joi.string().uri().messages({
        "string.base": `"download_url" debe ser un texto.`,
        "string.uri": `"download_url" debe ser una URL válida.`
    }),
    expires_at: Joi.date().greater("now").messages({
        "date.base": `"expires_at" debe ser una fecha.`,
        "date.greater": `"expires_at" debe ser una fecha futura.`
    }),
    used: Joi.boolean().messages({
        "boolean.base": `"used" debe ser verdadero o falso.`
    })
});

module.exports = updateDownloadLinkSchema;
