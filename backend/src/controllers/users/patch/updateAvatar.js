const { Users } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const updateAvatar = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que se subió un archivo
        if (!req.file) {
            return responseHelper.errorResponse(
                res,
                "no_file_uploaded",
                "No se subió ninguna imagen.",
                "user_update_avatar",
                400
            );
        }

        const user = await Users.findByPk(id);
        if (!user) {
            return responseHelper.errorResponse(
                res,
                "user_not_found",
                "Usuario no encontrado.",
                "user_update_avatar",
                404
            );
        }

        // Construir URL o ruta del archivo
        const avatarUrl = `/uploads/products/${req.file.filename}`;

        // Actualizar campo avatar_url
        await user.update({ avatar_url: avatarUrl });

        const updatedUser = await Users.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        return responseHelper.successResponse(res, updatedUser, "user_update_avatar");
    } catch (error) {
        console.error("Error al actualizar avatar:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_update_avatar", 500);
    }
};

module.exports = updateAvatar;
