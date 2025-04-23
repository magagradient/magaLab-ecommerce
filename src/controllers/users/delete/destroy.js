const { Users } = require("../../../database/indexModels");

const destroy = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);

        if (!user) return res.status(404).json({
            error: "Usuario no encontrado.",
            status: "not_found",
            source: "user_destroy",
            timestamp: new Date().toISOString()
        });

        const userToDelete = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] },
            include: [] // Agregá asociaciones si aplica
        });

        await user.destroy();

        return res.status(200).json({
            result: userToDelete,
            status: "deleted",
            source: "user_destroy",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_destroy",
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = destroy;