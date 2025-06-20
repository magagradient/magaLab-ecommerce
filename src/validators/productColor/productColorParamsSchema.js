const Joi = require("joi");

const productColorParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required()
        .messages({
            "number.base": `"id" debe ser un número.`,
            "number.integer": `"id" debe ser un número entero.`,
            "number.positive": `"id" debe ser un número positivo.`,
            "any.required": `"id" es obligatorio.`,
        }),
    id_color: Joi.number().integer().positive().required()
        .messages({
            "number.base": `"id_color" debe ser un número.`,
            "number.integer": `"id_color" debe ser un número entero.`,
            "number.positive": `"id_color" debe ser un número positivo.`,
            "any.required": `"id_color" es obligatorio.`,
        }),
});

module.exports = productColorParamsSchema;
