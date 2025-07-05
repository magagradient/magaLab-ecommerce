const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // máximo 5 registros por IP por hora
    message: {
        message: "Demasiados intentos de registro. Por favor intentá nuevamente más tarde."
    },
    standardHeaders: true, // devuelve los headers RateLimit
    legacyHeaders: false,
});

module.exports = registerLimiter;
