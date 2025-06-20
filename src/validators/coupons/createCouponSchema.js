const Joi = require("joi");

const createCouponSchema = Joi.object({
    code: Joi.string().trim().min(3).max(50).required()
        .messages({
            "string.base": `"code" debe ser una cadena.`,
            "string.empty": `"code" no puede estar vacío.`,
            "string.min": `"code" debe tener al menos 3 caracteres.`,
            "string.max": `"code" no puede exceder los 50 caracteres.`,
            "any.required": `"code" es obligatorio.`
        }),
    discount: Joi.number().positive().precision(2).required()
        .messages({
            "number.base": `"discount" debe ser un número.`,
            "number.positive": `"discount" debe ser positivo.`,
            "any.required": `"discount" es obligatorio.`
        }),
    expiration_date: Joi.date().iso().required()
        .messages({
            "date.base": `"expiration_date" debe ser una fecha.`,
            "any.required": `"expiration_date" es obligatorio.`
        }),
    max_uses: Joi.number().integer().positive().allow(null)
        .messages({
            "number.base": `"max_uses" debe ser un número entero.`,
            "number.positive": `"max_uses" debe ser positivo o nulo.`
        }),
    type: Joi.string().valid("general", "personalized").required()
        .messages({
            "any.only": `"type" debe ser "general" o "personalized".`,
            "any.required": `"type" es obligatorio.`
        })
});

module.exports = createCouponSchema;
