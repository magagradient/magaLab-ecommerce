const Joi = require("joi");

const idProductParamSchema = Joi.object({
    id_product: Joi.number().integer().positive().required().messages({
        "number.base": `"id_product" debe ser un número.`,
        "number.integer": `"id_product" debe ser un número entero.`,
        "number.positive": `"id_product" debe ser un número positivo.`,
        "any.required": `"id_product" es obligatorio.`,
    }),
});

module.exports = idProductParamSchema;
