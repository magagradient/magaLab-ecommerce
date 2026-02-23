const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: process.env.NODE_ENV === "production" ? 5 : 50, // más laxo en dev
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(429).json({
            status: "error",
            message: "Demasiados intentos de login. Intente nuevamente más tarde."
        });
    }
});

module.exports = loginLimiter;