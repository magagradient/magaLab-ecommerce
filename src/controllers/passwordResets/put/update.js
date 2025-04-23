const { PasswordResets, Users } = require("../../../database/indexModels");

const update = async (req, res) => {
    try {
        const reset = await PasswordResets.findByPk(req.params.id);

        if (!reset) {
            return res.status(404).json({
                error: "Registro no encontrado.",
                status: "not_found",
                source: "password_resets_update",
                timestamp: new Date().toISOString(),
            });
        }

        const { token, used, expires_at } = req.body;

        if (token) reset.token = token;
        if (used !== undefined) reset.used = used;
        if (expires_at) reset.expires_at = expires_at;

        await reset.save();

        const result = await PasswordResets.findByPk(req.params.id, {
            include: [{ model: Users, as: "user" }],
        });

        return res.status(200).json({
            result,
            status: "updated",
            source: "password_resets_update",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al actualizar registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_update",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = update;