const { PasswordResets, Users } = require("../../../database/indexModels");

const index = async (req, res) => {
    try {
        const allResets = await PasswordResets.findAll({
            include: [{ model: Users, as: "user" }],
        });

        if (allResets.length > 0) {
            return res.status(200).json({
                results: allResets,
                total: allResets.length,
                status: "success",
                source: "password_resets",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(404).json({
            error: "No se encontraron registros de reseteo.",
            status: "not_found",
            source: "password_resets",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al obtener registros:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = index;