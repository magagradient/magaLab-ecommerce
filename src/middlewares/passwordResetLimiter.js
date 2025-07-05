const rateLimit = require("express-rate-limit");

const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 3, // máximo 3 pedidos por IP
    message: {
        message: "Demasiadas solicitudes de recuperación de contraseña. Intentá nuevamente más tarde."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = passwordResetLimiter;
