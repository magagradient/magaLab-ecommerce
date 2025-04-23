const { Users } = require("../../../database/indexModels");
const { Op } = require("sequelize");


const update = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Users.findByPk(req.params.id);

        if (!user) return res.status(404).json({
            error: "Usuario no encontrado.",
            status: "not_found",
            source: "user_update",
            timestamp: new Date().toISOString()
        });

        if (email) {
            const emailExists = await Users.findOne({
                where: {
                    email,
                    id_user: { [Op.ne]: user.id_user }
                }
            });
            if (emailExists) {
                return res.status(409).json({
                    error: "Ese email ya está en uso.",
                    status: "conflict",
                    source: "user_update",
                    timestamp: new Date().toISOString()
                });
            }
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();

        const updatedUser = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] },
            include: [] // Agregá asociaciones si aplica
        });

        return res.status(200).json({
            result: updatedUser,
            status: "success",
            source: "user_update",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).json({
            error: "Error interno del servidor",
            description: error.message,
            source: "user_update",
            timestamp: new Date().toISOString()
        });
    }
};


module.exports = update;