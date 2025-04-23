const { PasswordChanges, Users } = require("../../../database/indexModels");


const create = async (req, res) => {
    try {
        const { id_user, change_date, ip_address } = req.body;

        if (!id_user || !change_date || !ip_address) {
            return res.status(400).json({ error: "Los campos id_user, change_date e ip_address son obligatorios." });
        }

        const newChange = await PasswordChanges.create({ id_user, change_date, ip_address });

        const result = await PasswordChanges.findByPk(newChange.id_change, {
            include: [{ model: Users, as: "userPasswordChanges" }],
        });

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error al crear el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
};

module.exports = create;