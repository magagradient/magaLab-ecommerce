const Joi = require("joi");

const categoryCreateSchema = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
        "string.base": "'name' debe ser un texto",
        "string.empty": "'name' no puede estar vacío",
        "any.required": "'name' es obligatorio",
    }),
});

module.exports = categoryCreateSchema;
