const Joi = require("joi");

const updateSeriesSchema = Joi.object({
    title: Joi.string().max(255),
    description: Joi.string().allow(null, ''),
    cover_image: Joi.string().uri().allow(null, '')
}).min(1); // Requiere al menos un campo para actualizar

module.exports = updateSeriesSchema;