const Joi = require("joi");

const updateUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .messages({
            'string.base': `'name' debe ser un texto`,
            'string.min': `'name' debe tener al menos 2 caracteres`,
            'string.max': `'name' no puede superar los 100 caracteres`,
        }),

    email: Joi.string()
        .email()
        .messages({
            'string.base': `'email' debe ser un texto`,
            'string.email': `'email' debe tener un formato válido`,
        }),

    role: Joi.string()
        .valid("admin", "user")
        .messages({
            'any.only': `'role' debe ser 'admin' o 'user'`,
        }),

    avatar_url: Joi.string()
        .uri()
        .allow(null)
        .messages({
            'string.uri': `'avatar_url' debe ser una URL válida`,
        }),

    is_deleted: Joi.boolean().messages({
        'boolean.base': `'is_deleted' debe ser un valor booleano`
    })
}).min(1).messages({
    'object.min': `Debe proporcionar al menos un campo para actualizar.`
});

module.exports = updateUserSchema;
