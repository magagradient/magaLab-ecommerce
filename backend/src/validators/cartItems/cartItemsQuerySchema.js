const Joi = require("joi");

const cartItemsQuerySchema = Joi.object({
    user_id: Joi.number().integer().required().messages({
        "any.required": "El parámetro user_id es obligatorio.",
        "number.base": "El user_id debe ser un número.",
    }),
    limit: Joi.number().integer().min(1).default(10),
    page: Joi.number().integer().min(1).default(1),
});

module.exports = cartItemsQuerySchema;
