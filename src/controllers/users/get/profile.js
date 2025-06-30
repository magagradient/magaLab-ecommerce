const { Users } = require("../../../database/indexModels");

module.exports = async (req, res, next) => {
    try {
        const { id_user } = req.user;

        const user = await Users.findOne({
            where: { id_user },
            attributes: [
                "id_user",
                "name",
                "email",
                "role",
                "avatar_url",
                "registration_date"
            ],
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.json({
            message: "Perfil del usuario autenticado",
            user,
        });
    } catch (error) {
        next(error);
    }
};
