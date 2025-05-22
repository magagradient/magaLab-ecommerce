const Joi = require('joi');

const productFilterSchema = Joi.object({
    category: Joi.array().items(Joi.number().integer()).optional(),
    styles: Joi.array().items(Joi.number().integer()).optional(),
    colors: Joi.array().items(Joi.number().integer()).optional(),
    themes: Joi.array().items(Joi.number().integer()).optional(),
    keywords: Joi.array().items(Joi.number().integer()).optional(),

    price_min: Joi.number().min(0).optional(),
    price_max: Joi.number().min(0).optional(),

    is_sold: Joi.boolean().optional(),
    visible_in_portfolio: Joi.boolean().optional(),

    sort_by: Joi.string().valid(
        'title', 'price', 'created_at', 'updated_at'
    ).optional(),
    order: Joi.string().valid('asc', 'desc').optional(),

    limit: Joi.number().integer().min(1).optional(),
    offset: Joi.number().integer().min(0).optional()
});

module.exports = productFilterSchema;
