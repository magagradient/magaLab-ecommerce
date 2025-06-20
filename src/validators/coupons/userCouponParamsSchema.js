const Joi = require("joi");

const userCouponParamsSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
        .messages({ "any.required": `"userId" es obligatorio.` }),
    couponId: Joi.number().integer().positive().required()
        .messages({ "any.required": `"couponId" es obligatorio.` }),
});

module.exports = userCouponParamsSchema;
