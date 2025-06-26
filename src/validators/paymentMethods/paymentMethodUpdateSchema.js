const Joi = require("joi");

const paymentMethodUpdateSchema = Joi.object({
    method_name: Joi.string().trim().min(2).max(50).messages({
        "string.base": `"method_name" debe ser un texto.`,
        "string.empty": `"method_name" no puede estar vacío.`,
        "string.min": `"method_name" debe tener al menos 2 caracteres.`,
        "string.max": `"method_name" no debe superar los 50 caracteres.`
    })
}).min(1).messages({
    "object.min": `Debes proporcionar al menos un campo para actualizar.`
});

module.exports = paymentMethodUpdateSchema;
