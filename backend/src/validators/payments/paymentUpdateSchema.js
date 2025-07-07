const Joi = require("joi");

const paymentUpdateSchema = Joi.object({
    status: Joi.string().valid("completed", "rejected", "under_review").optional(),
    payment_date: Joi.date().optional(),
    amount_paid: Joi.number().positive().optional()
});

module.exports = paymentUpdateSchema;
