const Joi = require("joi");

const favoriteProductCreateSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`,
        "any.required": `"id_user" es obligatorio.`,
    }),
    id_product: Joi.number().integer().positive().required().messages({
        "number.base": `"id_product" debe ser un número.`,
        "number.integer": `"id_product" debe ser un número entero.`,
        "number.positive": `"id_product" debe ser un número positivo.`,
        "any.required": `"id_product" es obligatorio.`,
    }),
});

module.exports = favoriteProductCreateSchema;