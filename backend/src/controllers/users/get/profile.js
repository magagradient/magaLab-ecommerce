const { Users } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const getProfile = async (req, res) => {
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
            raw: true,
        });

        if (!user) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Usuario no encontrado.",
                "user_profile",
                404
            );
        }

        return responseHelper.successResponse(
            res,
            user,
            "user_profile"
        );

    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "user_profile",
            500
        );
    }
};

module.exports = getProfile;
