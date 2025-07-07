const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 intentos
    message: {
        status: 'error',
        message: 'Demasiados intentos de login. Intente nuevamente más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;
