const { Users } = require("../../../database/indexModels");

const index = async (req, res) => {
    try {
        const allUsers = await Users.findAll({
            attributes: { exclude: ["password"] }
        });

        if (allUsers.length > 0) {
            return res.status(200).json({
                results: allUsers,
                total: allUsers.length,
                status: "success",
                source: "users_index",
                timestamp: new Date().toISOString()
            });
        }

        return res.status(404).json({
            error: "No se encontraron usuarios.",
            status: "not_found",
            source: "users_index",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "users_index",
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = index;