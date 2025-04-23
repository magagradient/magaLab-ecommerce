const { PasswordResets, Users } = require("../../../database/indexModels");
const { Op } = require("sequelize");



const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) {
            return res.status(400).json({
                error: "Falta término de búsqueda.",
                status: "bad_request",
                source: "password_resets_search",
                timestamp: new Date().toISOString(),
            });
        }

        const results = await PasswordResets.findAll({
            where: {
                token: { [Op.like]: `%${query}%` },
            },
            include: [{ model: Users, as: "user" }],
        });

        if (results.length === 0) {
            return res.status(404).json({
                error: "No se encontraron resultados.",
                status: "not_found",
                source: "password_resets_search",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "password_resets_search",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            status: "error",
            source: "password_resets_search",
            timestamp: new Date().toISOString(),
        });
    }
};

module.exports = search;