const { DownloadLinks, Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const ByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Verificar si el usuario existe
        const user = await Users.findByPk(userId);

        if (!user) {
            return responseHelper.errorResponse(res, "user_not_found", "Usuario no encontrado.", "download_links_get_by_user", 404);
        }

        // Recuperar todos los enlaces de descarga del usuario
        const downloadLinks = await DownloadLinks.findAll({
            where: {
                id_user: userId,
            },
        });

        // Si no tiene enlaces de descarga, responder con lista vacía
        if (downloadLinks.length === 0) {
            return responseHelper.successResponse(res, [], "download_links_get_by_user");
        }

        // Responder con los enlaces de descarga
        return responseHelper.successResponse(res, downloadLinks, "download_links_get_by_user");

    } catch (error) {
        console.error("Error al obtener los enlaces de descarga del usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "download_links_get_by_user", 500);
    }
};

module.exports = ByUser;
