const { PasswordChanges, Users } = require("../../../database/indexModels");


const index = async (req, res) => {
    try {
        const allChanges = await PasswordChanges.findAll({
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (allChanges.length > 0) {
            return res.status(200).json({
                results: allChanges,
                total: allChanges.length,
                status: "success",
                source: "password_changes",
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(404).json({ error: "No se encontraron registros." });
    } catch (error) {
        console.error("Error al obtener cambios de contraseña:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = index;
