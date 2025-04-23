const { PasswordChanges, Users } = require("../../../database/indexModels");


const update = async (req, res) => {
    try {
        const change = await PasswordChanges.findByPk(req.params.id);

        if (!change) return res.status(404).json({ error: "Registro no encontrado." });

        const { change_date, ip_address } = req.body;

        if (change_date) change.change_date = change_date;
        if (ip_address) change.ip_address = ip_address;

        await change.save();

        const result = await PasswordChanges.findByPk(req.params.id, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = update;