const Joi = require("joi");

const userIdParamSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "any.required": `"id_user" es obligatorio.`,
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`
    })
});

const productIdParamSchema = Joi.object({
    id_product: Joi.number().integer().positive().required().messages({
        "any.required": `"id_product" es obligatorio.`,
        "number.base": `"id_product" debe ser un número.`,
        "number.integer": `"id_product" debe ser un número entero.`,
        "number.positive": `"id_product" debe ser un número positivo.`
    })
});

module.exports = {
    userIdParamSchema,
    productIdParamSchema
};
