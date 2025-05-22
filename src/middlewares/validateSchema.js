const validateSchema = (schema, property = 'body') => {
    return (req, res, next) => {
        const data = req[property];

        const { error, value } = schema.validate(data, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (error) {
            return res.status(400).json({
                message: "Error de validación.",
                details: error.details.map(detail => detail.message),
                timestamp: new Date()
            });
        }

        // Actualiza solo la propiedad validada
        req[property] = value;

        next();
    };
};

module.exports = validateSchema;
