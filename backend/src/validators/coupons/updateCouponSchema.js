const Joi = require("joi");

const updateCouponSchema = Joi.object({
    code: Joi.string().trim().min(3).max(50),
    discount: Joi.number().positive().precision(2),
    expiration_date: Joi.date().iso(),
    max_uses: Joi.number().integer().positive().allow(null),
    type: Joi.string().valid("general", "personalized")
}).min(1).messages({
    "object.min": "Debes proporcionar al menos un campo para actualizar."
});

module.exports = updateCouponSchema;
