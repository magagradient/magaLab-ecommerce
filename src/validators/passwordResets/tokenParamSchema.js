const Joi = require("joi");

const tokenParamSchema = Joi.object({
    token: Joi.string().required().messages({
        "any.required": "'token' es obligatorio.",
        "string.base": "'token' debe ser texto.",
        "string.empty": "'token' no puede estar vacío.",
    }),
});

module.exports = tokenParamSchema;
