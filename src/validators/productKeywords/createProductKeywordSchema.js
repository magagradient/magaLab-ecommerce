const Joi = require("joi");

const createProductKeywordSchema = Joi.object({
    id_product: Joi.number().integer().positive().required().messages({
        "number.base": `"id_product" debe ser un número.`,
        "number.integer": `"id_product" debe ser un número entero.`,
        "number.positive": `"id_product" debe ser un número positivo.`,
        "any.required": `"id_product" es obligatorio.`,
    }),
    id_keyword: Joi.number().integer().positive().required().messages({
        "number.base": `"id_keyword" debe ser un número.`,
        "number.integer": `"id_keyword" debe ser un número entero.`,
        "number.positive": `"id_keyword" debe ser un número positivo.`,
        "any.required": `"id_keyword" es obligatorio.`,
    }),
});

module.exports = createProductKeywordSchema;