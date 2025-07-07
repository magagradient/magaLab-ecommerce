const Joi = require("joi");

const productStyleIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "number.base": `'id' debe ser un número.`,
        "number.integer": `'id' debe ser un número entero.`,
        "number.positive": `'id' debe ser un número positivo.`,
        "any.required": `'id' es obligatorio.`,
    }),
});

module.exports = productStyleIdParamSchema;
