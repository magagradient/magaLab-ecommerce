// src/validators/userCoupons/updateUserCouponSchema.js
const Joi = require("joi");

const updateUserCouponSchema = Joi.object({
    id_user: Joi.number().integer().positive().messages({
        "number.base": "'id_user' debe ser un número.",
        "number.integer": "'id_user' debe ser un número entero.",
        "number.positive": "'id_user' debe ser un número positivo."
    }),
    id_coupon: Joi.number().integer().positive().messages({
        "number.base": "'id_coupon' debe ser un número.",
        "number.integer": "'id_coupon' debe ser un número entero.",
        "number.positive": "'id_coupon' debe ser un número positivo."
    }),
    used: Joi.number().valid(0, 1).messages({
        "number.base": "'used' debe ser 0 o 1.",
        "any.only": "'used' solo puede ser 0 o 1."
    }),
    granted_date: Joi.date().iso().messages({
        "date.base": "'granted_date' debe ser una fecha válida.",
        "date.format": "'granted_date' debe tener formato ISO."
    })
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar."
});

module.exports = updateUserCouponSchema;
