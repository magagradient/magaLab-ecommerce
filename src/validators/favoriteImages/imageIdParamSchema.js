const Joi = require("joi");

const imageIdParamSchema = Joi.object({
    imageId: Joi.number().integer().positive().required().messages({
        "number.base": `"imageId" debe ser un número.`,
        "number.integer": `"imageId" debe ser un número entero.`,
        "number.positive": `"imageId" debe ser un número positivo.`,
        "any.required": `"imageId" es obligatorio.`,
    }),
});

module.exports = imageIdParamSchema;
