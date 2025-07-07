const Joi = require("joi");

const createThemeSchema = Joi.object({
    name: Joi.string().max(50).required()
});

module.exports = createThemeSchema;
