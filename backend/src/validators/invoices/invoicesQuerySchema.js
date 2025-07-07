const Joi = require('joi');

const invoicesQuerySchema = Joi.object({
    limit: Joi.number().integer().min(1).default(10),
    page: Joi.number().integer().min(1).default(1),
});

module.exports = invoicesQuerySchema;
