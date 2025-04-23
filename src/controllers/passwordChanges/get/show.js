const { PasswordChanges, Users } = require("../../../database/indexModels");

const show = async (req, res) => {
    try {
        const change = await PasswordChanges.findByPk(req.params.id, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        if (!change) return res.status(404).json({ error: "Registro no encontrado." });

        return res.status(200).json(change);
    } catch (error) {
        console.error("Error al obtener el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = show;