const Joi = require("joi");

const productStyleParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "number.base": `'id' debe ser un número.`,
        "number.integer": `'id' debe ser un número entero.`,
        "number.positive": `'id' debe ser un número positivo.`,
        "any.required": `'id' es obligatorio.`,
    }),
    styleId: Joi.number().integer().positive().required().messages({
        "number.base": `'styleId' debe ser un número.`,
        "number.integer": `'styleId' debe ser un número entero.`,
        "number.positive": `'styleId' debe ser un número positivo.`,
        "any.required": `'styleId' es obligatorio.`,
    }),
});

module.exports = productStyleParamsSchema;
