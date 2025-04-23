const { PasswordResets, Users } = require("../../../database/indexModels");

const destroy = async (req, res) => {
    try {
        const reset = await PasswordResets.findByPk(req.params.id, {
            include: [{ model: Users, as: "user" }],
        });

        if (!reset) {
            return res.status(404).json({
                error: "Registro no encontrado.",
                status: "not_found",
                source: "password_resets_destroy",
                timestamp: new Date().toISOString(),
            });
        }

        await reset.destroy();

        return res.status(200).json({
            message: "Registro eliminado correctamente.",
            deleted: reset,
            status: "deleted",
            source: "password_resets_destroy",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error al eliminar registro:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_destroy",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = destroy;