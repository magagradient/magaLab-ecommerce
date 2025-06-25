const Joi = require("joi");

const userCouponParamsSchema = Joi.object({
    id_user: Joi.number().integer().positive().required()
        .messages({ "any.required": `"userId" es obligatorio.` }),
    id_coupon: Joi.number().integer().positive().required()
        .messages({ "any.required": `"couponId" es obligatorio.` }),
});

module.exports = userCouponParamsSchema;
