const Joi = require("joi");

const favoriteSeriesParamsSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`,
        "any.required": `"id_user" es obligatorio.`,
    }),
    id_series: Joi.number().integer().positive().required().messages({
        "number.base": `"id_series" debe ser un número.`,
        "number.integer": `"id_series" debe ser un número entero.`,
        "number.positive": `"id_series" debe ser un número positivo.`,
        "any.required": `"id_series" es obligatorio.`,
    }),
});

module.exports = favoriteSeriesParamsSchema;
