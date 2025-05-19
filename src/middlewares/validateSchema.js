const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });

        if (error) {
            return res.status(400).json({
                message: "Error de validación.",
                details: error.details.map(detail => detail.message),
                timestamp: new Date()
            });
        }

        // Reemplazamos req.body por los datos validados
        req.body = value;
        next();
    };
};

module.exports = validateSchema;
