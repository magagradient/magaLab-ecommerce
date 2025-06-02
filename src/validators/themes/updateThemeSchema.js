const Joi = require("joi");

const updateThemeSchema = Joi.object({
    name: Joi.string().max(50).required()
});

module.exports = updateThemeSchema;