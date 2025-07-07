const { DownloadLinks } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el enlace de descarga por su ID
        const downloadLink = await DownloadLinks.findByPk(id);

        if (!downloadLink) {
            return responseHelper.errorResponse(res, "download_link_not_found", "Enlace de descarga no encontrado.", "delete_download_link", 404);
        }

        // Eliminar el enlace de descarga
        await downloadLink.destroy();

        return responseHelper.successResponse(res, [], "delete_download_link");

    } catch (error) {
        console.error("Error al eliminar el enlace de descarga:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "delete_download_link", 500);
    }
};

module.exports = destroy;
