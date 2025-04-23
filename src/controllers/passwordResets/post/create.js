const { PasswordResets, Users } = require("../../../database/indexModels");

const create = async (req, res) => {
    try {
        const { id_user, token, expires_at, used } = req.body;

        if (!id_user || !token || !expires_at) {
            return res.status(400).json({
                error: "Los campos id_user, token y expires_at son obligatorios.",
                status: "bad_request",
                source: "password_resets_create",
                timestamp: new Date().toISOString(),
            });
        }

        const newReset = await PasswordResets.create({
            id_user,
            token,
            expires_at,
            used: used ?? false,
        });

        const result = await PasswordResets.findByPk(newReset.id_reset, {
            include: [{ model: Users, as: "user" }],
        });

        return res.status(201).json({
            result,
            status: "created",
            source: "password_resets_create",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al crear registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_create",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = create;