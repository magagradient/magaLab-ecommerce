const { PasswordChanges, Users } = require("../../../database/indexModels");
const { Op } = require("sequelize");


const search = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) return res.status(400).json({ error: "Falta término de búsqueda." });

        const results = await PasswordChanges.findAll({
            where: {
                ip_address: { [Op.like]: `%${query}%` },
            },
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (results.length === 0) return res.status(404).json({ error: "No se encontraron resultados." });

        return res.status(200).json({
            results,
            total: results.length,
            status: "success",
            source: "password_changes_search",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error en la búsqueda por IP:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = search;
