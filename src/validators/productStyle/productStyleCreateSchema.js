const Joi = require("joi");

const productStyleCreateSchema = Joi.object({
    id_style: Joi.number().integer().positive().required().messages({
        "number.base": `'id_style' debe ser un número.`,
        "number.integer": `'id_style' debe ser un número entero.`,
        "number.positive": `'id_style' debe ser un número positivo.`,
        "any.required": `'id_style' es obligatorio.`,
    }),
});

module.exports = productStyleCreateSchema;
