const Joi = require("joi");

const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required().messages({
        "any.required": `"userId" es obligatorio.`,
        "number.base": `"userId" debe ser un número.`,
        "number.integer": `"userId" debe ser un número entero.`,
        "number.positive": `"userId" debe ser un número positivo.`
    })
});

const productIdParamSchema = Joi.object({
    productId: Joi.number().integer().positive().required().messages({
        "any.required": `"productId" es obligatorio.`,
        "number.base": `"productId" debe ser un número.`,
        "number.integer": `"productId" debe ser un número entero.`,
        "number.positive": `"productId" debe ser un número positivo.`
    })
});

module.exports = {
    userIdParamSchema,
    productIdParamSchema
};
