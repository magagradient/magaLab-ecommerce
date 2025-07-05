const Joi = require('joi');

const productFilterSchema = Joi.object({
    category: Joi.string().optional(),
    series: Joi.string().optional(),
    keywords: Joi.string().optional(),
    styles: Joi.string().optional(),
    colors: Joi.string().optional(),
    themes: Joi.string().optional(),

    title: Joi.string().optional(),
    description: Joi.string().optional(),

    price_min: Joi.number().min(0).optional(),
    price_max: Joi.number().min(0).optional(),

    is_sold: Joi.boolean().optional(),
    visible_in_portfolio: Joi.boolean().optional(),

    sort_by: Joi.string().valid('title', 'price', 'createdAt', 'updatedAt').optional(),
    order: Joi.string().valid('asc', 'desc').optional(),

    limit: Joi.number().integer().min(1).default(5),
    page: Joi.number().integer().min(1).default(1),
});

module.exports = productFilterSchema;
