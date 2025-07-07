const Joi = require("joi");

const createSeriesSchema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().allow(null, ''),
    cover_image: Joi.string().uri().allow(null, '')
});

module.exports = createSeriesSchema;