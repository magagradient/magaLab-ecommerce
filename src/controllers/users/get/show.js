const { Users } = require("../../../database/indexModels");

const show = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) return res.status(404).json({
            error: "Usuario no encontrado.",
            status: "not_found",
            source: "user_show",
            timestamp: new Date().toISOString()
        });

        return res.status(200).json({
            result: user,
            status: "success",
            source: "user_show",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_show",
            timestamp: new Date().toISOString()
        });
    }
};


module.exports = show;