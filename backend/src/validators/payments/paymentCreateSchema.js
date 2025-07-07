const Joi = require("joi");

const paymentCreateSchema = Joi.object({
    id_order: Joi.number().integer().positive().required(),
    id_payment_method: Joi.number().integer().positive().required(),
    status: Joi.string().valid("completed", "rejected", "under_review").required(),
    payment_date: Joi.date().optional(),
    amount_paid: Joi.number().positive().required()
});

module.exports = paymentCreateSchema;
