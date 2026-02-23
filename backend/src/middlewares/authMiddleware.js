const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRoles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        const [scheme, token] = authHeader.split(" ");

        // validar formato "Bearer <token>"
        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Formato de token inválido" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded; // { id_user, email, role, iat, exp }

            // si se especifican roles requeridos, validar permisos
            if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "No tenés permisos para acceder a este recurso" });
            }

            return next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
    };
};

module.exports = authMiddleware;