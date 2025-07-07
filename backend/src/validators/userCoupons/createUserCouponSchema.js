const Joi = require("joi");

const createUserCouponSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "any.required": "'id_user' es obligatorio.",
        "number.base": "'id_user' debe ser un número.",
        "number.integer": "'id_user' debe ser un número entero.",
        "number.positive": "'id_user' debe ser un número positivo."
    }),
    id_coupon: Joi.number().integer().positive().required().messages({
        "any.required": "'id_coupon' es obligatorio.",
        "number.base": "'id_coupon' debe ser un número.",
        "number.integer": "'id_coupon' debe ser un número entero.",
        "number.positive": "'id_coupon' debe ser un número positivo."
    }),
    used: Joi.number().valid(0, 1).optional().messages({
        "number.base": "'used' debe ser 0 o 1.",
        "any.only": "'used' solo puede ser 0 o 1."
    }),
    granted_date: Joi.date().iso().optional().messages({
        "date.base": "'granted_date' debe ser una fecha válida.",
        "date.format": "'granted_date' debe tener formato ISO."
    })
});

module.exports = createUserCouponSchema;
